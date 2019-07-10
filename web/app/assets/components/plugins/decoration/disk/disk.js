import { isIE } from '../../../../utils/common';

export default class PluginDecorationDisk {
    static singleton = true;
    static code = 'p-decoration-disk';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;

    root = null;
    offestTop = 0;
    elements = {
        top: null,
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
        let transform;
        const bottomBounding = this.elements.bottom.getBoundingClientRect();
        if (bottomBounding.bottom < window.innerHeight * 2) {
            const progress = Math.min(1, Math.pow((window.innerHeight - (bottomBounding.bottom - window.innerHeight)) / (window.innerHeight * 1), 2));
            const translationYBonus = bottomBounding.top - this.offsetTop + 4.5;
            if (bottomBounding.bottom >= window.innerHeight) {
                transform = `translate(-5.1px, ${translationYBonus * progress }px) rotate(${window.scrollY / 5 + 360 * progress}deg)`;
                this.root.classList.remove('_collapsed');
            } else {
                transform = `translate(-5.1px, ${translationYBonus * progress }px) rotate(${(window.scrollY + bottomBounding.bottom - window.innerHeight) / 5 + 360 * progress}deg)`;
                this.root.classList.add('_collapsed');
            }

        } else {
            transform = `translate(-5.1px, 0) rotate(${window.scrollY / 5}deg)`;
        }
        
        this.elements.top.style.transform = transform;
        this.elements.top.style.webkitTransform = transform;
        this.elements.top.style.mozTransform = transform;
        this.elements.top.style.msTransform = transform;
        this.elements.top.style.oTransform = transform;
    }
}