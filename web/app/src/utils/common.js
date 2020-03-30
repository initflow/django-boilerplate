export const updateDjangoScriptTags = () => {
    const cmsScripts = document.querySelectorAll('script[data-cms]');
    for (let i = 0; i < cmsScripts.length; i++) {
        const script = cmsScripts[i];
        if (!script.hasAttribute('type')) {
            script.setAttribute('type', 'application/javascript');
        }
    }
};

export class updateDjangoTamplateTags {
    constructor(instance) {
        this.instance = instance;
        this.init();
    };

    _canBePatched() {
        return window.CMS !== undefined && window.CMS.config.mode === 'draft';
    };

    _replaceTemplateTags() {
        var templates = document.querySelectorAll('template.cms-plugin');
        for (var i = 0; i < templates.length; i++) {
            var template = templates[i];
            var cmsTemplate = document.createElement('cms-template');
            cmsTemplate.className = template.className;
            template.parentNode.insertBefore(cmsTemplate, template);
            template.parentNode.removeChild(template);
        }
    };

    _moveScriptTags() {
        var scripts = this.instance.$options.el.querySelectorAll('script[data-cms]');
        for (var i = 0; i < scripts.length; i++) {
            scripts[i].parentNode.removeChild(scripts[i]);
            document.body.appendChild(scripts[i]);
        }
    };

    _cleanTemplateTags() {
        var cmsTemplates = document.querySelectorAll('cms-template');
        for (var i = 0; i < cmsTemplates.length; i++) {
            cmsTemplates[i].parentNode.removeChild(cmsTemplates[i]);
        }
    };

    refresh() {
        if (this._canBePatched()) {
            this.instance.$destroy();
            delete this.instance.$options.render; // Force re-render.
            this.instance = new this.instance.constructor(this.instance.$options);
            window.CMS.Plugin._initializeTree();
        }
    };

    patch() {
        if (this._canBePatched()) {
            this._replaceTemplateTags();
            this._moveScriptTags();
            window.CMS.$(document).on('ready', this._cleanTemplateTags.bind(this));
            // window.CMS.$(window).on('cms-content-refresh', this.refresh.bind(this));
        }
    };

    init() {
        if (this._canBePatched() && !this.instance.$options._cmsPatched) {
            this.patch();
            this.instance.$options._cmsPatched = true;
        }
    };
};

export const toggleFullscreen = (element, callback = function() { }) => {
    function onFullScreenChange() {
        var fullScreenElement =
            document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
        // eslint-disable-next-line standard/no-callback-literal
        callback(!!fullScreenElement);
    };

    if (document.onfullscreenchange === null) {
        document.onfullscreenchange = onFullScreenChange;
    } else if (document.onmsfullscreenchange === null) {
        document.onmsfullscreenchange = onFullScreenChange;
    } else if (document.onmozfullscreenchange === null) {
        document.onmozfullscreenchange = onFullScreenChange;
    } else if (document.onwebkitfullscreenchange === null) {
        document.onwebkitfullscreenchange = onFullScreenChange;
    }

    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
};

export const injectResize = (url, resize) => {
    const lastSlashIndex = url.lastIndexOf('/');
    if (lastSlashIndex < 0) {
        return;
    }
    const result = url.slice(0, lastSlashIndex) + '/' + resize + url.slice(lastSlashIndex);
    return result;
};

export const getCSRFToken = () => {
    const token = document.querySelector('[name="csrfmiddlewaretoken"]');
    if (!token) {
        console.error('CSRF token not found');
        return '';
    }
    return document.querySelector('[name="csrfmiddlewaretoken"]').value;
};

export const getDeclension = (number, wordForms) => {
    // getDeclension(1, ['минута', 'минуты', 'минут'])
    const lastTwoDigits = Math.abs(number) % 100;
    const lastDigit = Math.abs(number) % 10;
    if (lastTwoDigits > 10 && lastTwoDigits < 20) {
        return wordForms[2];
    }
    if (lastDigit > 1 && lastDigit < 5) {
        return wordForms[1];
    }
    if (lastDigit === 1) {
        return wordForms[0];
    }
    return wordForms[2];
};

export const getObjectValueByPath = (objToSearh = {}, path = '', forceNewObject = false) => {
    let obj = forceNewObject ? JSON.parse(JSON.stringify(objToSearh)) : objToSearh;
    if (!path || path === '.') {
        return obj;
    }
    for (var i = 0, levels = path.split('.'); i < levels.length; i++) {
        const nextLevel = obj[levels[i]];
        if (nextLevel === undefined) {
            return undefined;
        }
        obj = nextLevel;
    };
    return obj;
};

export default {
    injectResize,
    getCSRFToken,
    getDeclension,
    getObjectValueByPath,
    toggleFullscreen,
    updateDjangoScriptTags,
    updateDjangoTamplateTags,
};
