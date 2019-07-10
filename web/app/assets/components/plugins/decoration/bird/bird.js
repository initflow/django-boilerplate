import { isIE } from '../../../../utils/common';

export default class PluginDecorationBird {
    static singleton = true;
    static code = 'p-decoration-bird';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;

    root = null;
    offestTop = 0;
    elements = {
        wire: null,
        bottom: null,
    };

    onEntryElement = (element) => {
        this.dataCode = this.constructor.dataCode;
        this.root = element;
        
        if (isIE()) {
            element.classList.add('_hidden');
            return;
        }
        this.offsetTop = parseInt(this.root.getAttribute(`${this.dataCode}-offset-top`), 10);
        window.app.initInstanceElements(this);

        window.addEventListener('scroll', this.scrollHandler.bind(this));
        window.addEventListener('resize', this.scrollHandler.bind(this));
    }
    
    scrollHandler() {
        let height;
        const bottomBounding = this.elements.bottom.getBoundingClientRect();
        if (bottomBounding.bottom < window.innerHeight * 2) {
            const wireBounding = this.elements.wire.getBoundingClientRect();
            const progress = Math.min(1, Math.pow((window.innerHeight - (bottomBounding.bottom - window.innerHeight)) / (window.innerHeight * 1), 2));
            const heightBonus = bottomBounding.top - wireBounding.top - 100 + 6;

            height = `${100 + heightBonus * progress }px`;
            if (bottomBounding.bottom >= window.innerHeight) {
                this.root.classList.remove('_collapsed');
            } else {
                this.root.classList.add('_collapsed');
            }

        } else {
            height = `100px`;
        }
        
        this.elements.wire.style.height = height;
    }
}