import { history } from '../../../utils/history';
import { getCurrentLanguage } from '../../../utils/common';
import { translations } from '../../../config';

export default class CommonNavigation {
    static singleton = true;
    static selector = '[data-c-navigation]';
    linkSelector = '[data-c-navlink]';
    currentSelector = '[data-c-navigation-element="current"]';
    nextSelector = '[data-c-navigation-element="next"]';

    onEntryElement = () => {
        this.next = () => document.querySelectorAll(this.nextSelector)[0];
        this.currentContent = () => document.querySelectorAll(this.currentSelector)[0];

        this.initNavigation();
        this.bindHistory();
        this.renderActiveMenuItem();

        this.prevHistoryState = history.location;
        this.lock = false;

        this.cache = {
            // [history.location.pathname]: {
            //     pageContent: this.currentContent().innerHTML,
            //     meta: this.getMeta()
            // }
        };
    }

    renderActiveMenuItem = () => {
    }

    getMeta = (node = document) => {
        const meta = {};
        const title = node.getElementsByTagName('title')[0];
        const description = node.querySelector('meta[name~="description"]');
        const image = node.querySelector('meta[property~="og:image"]');
        if (title) {
            meta.title = title.innerHTML;
        }
        if (description) {
            meta.description = description.getAttribute('content');
        }
        if (image) {
            meta.image = image.getAttribute('content');
        }
        return meta;
    };

    setMeta(meta) {
        try {
            document.title = meta.title;
            document.querySelector('meta[property="og:title"]').setAttribute('content', meta.title);

            document.querySelector('meta[name="description"]').setAttribute('content', meta.description);
            document.querySelector('meta[property="og:description"]').setAttribute('content', meta.description);

            document.querySelector('meta[property="og:image"]').setAttribute('content', meta.image);
        } catch (e) { }
    }

    renderContent = (pageContent, meta) => {
        // this.next().classList.add('_loaded');

        setTimeout(() => {
            this.setMeta(meta);
            this.currentContent().innerHTML = '';
        }, 0);

        setTimeout(() => {
            this.currentContent().innerHTML = pageContent;
            window.scrollTo(0, 0);
            this.lock = false;
            
            app.initializeComponents();
        }, 0);

        setTimeout(() => {
            this.next().classList.remove('_active');
            // this.next().classList.remove('_loaded');
        }, 200);
    }

    getContent = (url, withFallback = true) => {
        this.lock = true;
        if (this.cache[url]) {
            this.renderContent(this.cache[url].pageContent, this.cache[url].meta);
            return;
        } else {
            this.next().classList.add('_active');

            try {
                fetch(url)
                    .then(response => {
                        return response.text();
                    })
                    .then(html => {
                        const parser = new DOMParser();
                        const content = parser.parseFromString(html, 'text/html');
    
                        const meta = this.getMeta(content);
                        const pageContent = content.querySelector(this.currentSelector).innerHTML;
    
                        this.cache[url] = {
                            pageContent,
                            meta
                        };
    
                        this.renderContent(pageContent, meta);
                    })
                    .catch(err => {
                        if (window.Raven) {
                            window.Raven.captureException(err);
                        }
                        if (withFallback) {
                            this.getContent(`/${getCurrentLanguage()}/`, false);
                            // this.getContent('/404', false);
                        }
                        console.error(err);
                    })
            } catch (e) {
                document.location.replace(url);
            }
        }
        
    }

    bindHistory = () => {
        history.listen((location, action) => {
            if (this.prevHistoryState.pathname !== location.pathname) {
                this.getContent(location.pathname);
                this.renderActiveMenuItem();
                this.prevHistoryState = location;
            }
        });
    }

    initNavigation = () => {
        document.addEventListener('click', e => {
            const closest = e.target.closest('a[data-c-navlink]');
            if (closest) {
                e.preventDefault();
                this.onLinkClick(closest.getAttribute('href'));
            }
            if (e.target.matches('a[data-c-navlink]')) {
                e.preventDefault();
                this.onLinkClick(e.target.getAttribute('href'));
            }
          }, false);
    }

    onLinkClick = url => {
        // TODO: prefetch on hover
        const currentLanguage = getCurrentLanguage();
        const languageSignature = `/${currentLanguage}/`;
        if (url === '/') {
            url = languageSignature;
        } else if (url.indexOf(languageSignature) === -1) {
            let otherLanguage = null;
            const languages = Object.keys(translations)
            for (let i = 0; i < languages.length; i++) {
                const lang = languages[i];
                if (lang !== currentLanguage && url.indexOf(lang) > -1) {
                    otherLanguage = lang;
                    break;
                }
            }
            if (otherLanguage === null) {
                url = languageSignature + url.substring(1);
            }
        }
        if (this.lock) {
            return;
        }
        try {
            window.app.getComponentInstanceByName('CommonHeader').vueComponent.closeSearch();
        } catch (e) {
            console.warn(e);
        }
        try {
            if (history.location.pathname !== url) {
                history.push(url);
            }
        } catch (e) {
            console.warn(e);
            document.location.replace(url);
        }
    }
};
