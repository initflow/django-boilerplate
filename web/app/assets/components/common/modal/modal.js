import baseTemplate from './modal.pug';

class CommonModal {
    
    selectors = {
        close: '[data-c-modal-element="close"]',
        content: '[data-c-modal-element="content"]',
    };
    elements = {
        closeAll: null,
        devOpenAll: null,
    };
    options = {
        template: null,
        onRequestClose: null,
        plain: false,
        rootClass: 'c-modal',
        modalActiveClass: 'c-modal_active',
        modalExitClass: 'c-modal_exit',
        modalAnimationDuration: 250,
    }

    root = null;
    config = null;

    constructor(options) {
        this.options = {
            ...this.options,
            ...options,
        }
        
        this.root = document.createElement('div');

        if (this.options.plain) {
            this.root = this.options.content;
        } else {
            this.root.innerHTML = baseTemplate(this.options.templateOptions).trim();
            this.root = this.root.firstChild;
            this.root.querySelector(this.selectors.content).appendChild(this.options.content);
        }
        document.body.appendChild(this.root);

        window.app.initializeComponents();

        this.initChildren();
        this.initCloseAll();
        this.open();
    }

    initChildren = () => {
        this.elements.closeAll = this.root.querySelectorAll(this.selectors.close);
    }

    initCloseAll = () => {
        for (let i = 0; i < this.elements.closeAll.length; i++) {
            const element = this.elements.closeAll[i];
            element.addEventListener('click', this.destroy);
        }
    }

    destroy = () => {
        if (this.options.onRequestClose !== null) {
            this.options.onRequestClose();
        }
        this.root.classList.add(this.options.modalExitClass);
        window.app.getComponentInstancesByName('LayoutGlobal')[0].instance.unfixBody();

        const toid = setTimeout(() => {
            document.body.removeChild(this.root);
            this.root = null;
            clearTimeout(toid);
        }, this.options.modalAnimationDuration);
    }

    open = () => {
        this.root.classList.add(this.options.modalActiveClass);
        window.app.getComponentInstancesByName('LayoutGlobal')[0].instance.fixBody();
    }
}

export default CommonModal;