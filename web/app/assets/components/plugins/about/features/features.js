import { isIE } from '../../../../utils/common';

export default class PluginAboutFeatures {
    static singleton = true;
    static code = 'p-about-features';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;

    vueComponent = null;
    root = null;
    elements = {
        features: null,
        feature_all: null,
    };
    delay = 3000;
    animationDuration = 500;
    interval = null;
    current = 0;
    total = 0;
    maxHeight = 0;

    onEntryElement = (element) => {
        this.dataCode = this.constructor.dataCode;
        this.root = element;
        window.app.initInstanceElements(this);

        this.initFeatures();
        window.addEventListener('load', this.initFeatures.bind(this));
        window.addEventListener('resize', this.initFeatures.bind(this));
    }
    
    initFeatures() {
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
            this.elements.feature_all.forEach((_, index) => {
                this.removeClass(this.elements.feature_all[index],'_active');
            });
        }
        this.total = this.elements.feature_all.length;
        this.calcMaxHeight();

        this.activateItem(this.current);
        if (this.total > 1) {
            this.interval = setInterval(this.updateCurrentFeature.bind(this), this.delay);
        }
    }

    calcMaxHeight() {
        this.maxHeight = 0;
        this.elements.feature_all.forEach(feature => {
            this.maxHeight = Math.max(feature.clientHeight, this.maxHeight);
        });
        this.elements.features.style.height = `${this.maxHeight}px`;
    }

    activateItem(index) {
        this.elements.feature_all[index].classList.add('_active');
    }

    deactivateItem(index) {
        this.elements.feature_all[index].classList.add('_exiting');
        setTimeout(() => { 
            this.removeClass(this.elements.feature_all[index], '_active');
            this.removeClass(this.elements.feature_all[index], '_exiting');
        }, this.animationDuration);
    }

    updateCurrentFeature() {
        this.deactivateItem(this.current++);
        if (this.current + 1 >= this.total) {
            this.current = 0;
        }
        this.activateItem(this.current);
    }

    removeClass(element, className) {
        element.classList.remove(className);
    }
}