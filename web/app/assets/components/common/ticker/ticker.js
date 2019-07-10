export default class Ticker {
    static singleton = true;
    static code = 'c-ticker';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;
    
    vueComponent = null;
    root = null;
    isOnScrollBinded = false;
    elements = {
        content: null,
        contentClone: null,
    };
    mode = null;
    approvedCount = 0;
    approvedThreshold = 4;
    modalHeight = 0;

    onEntryElement = (element) => {
        this.dataCode = this.constructor.dataCode;
        this.root = element;
        window.app.initInstanceElements(this);

        this.speed = parseInt(this.root.getAttribute(`${this.dataCode}-speed`), 10) || 200;
        this.mode = this.root.getAttribute(`${this.dataCode}-mode`) || 'animation';
        this.text = this.root.getAttribute(`${this.dataCode}-text`);
        if (this.text === null || this.text.trim().length === 0) {
            this.text = 'New Holland';
        }

        window.addEventListener('load', () => {
            this.cssLoaded = true;
        });

        window.addEventListener('resize', this.initTicker.bind(this));
        this.initTicker();
    }

    initTicker() {
        if (this.elements.content !== null && this.elements.contentClone !== null) {
            const wrapper = this.elements.content.parentElement;
            const initHeadlineContent = () => {
                let wrapperWidth = wrapper.clientWidth;
                this.elements.content.children[0].innerHTML = this.text;
                const baseItemHTML = this.elements.content.children[0].outerHTML;

                this.elements.content.innerHTML = '';
                this.elements.contentClone.innerHTML = '';
                this.elements.content.insertAdjacentHTML('beforeEnd', baseItemHTML);

                const itemsAmount = Math.ceil(wrapperWidth / this.elements.content.clientWidth);
                for (let i = 0; i < itemsAmount; i++) {
                    this.elements.content.insertAdjacentHTML('beforeEnd', baseItemHTML);
                }
                this.elements.contentClone.insertAdjacentHTML('beforeEnd', this.elements.content.innerHTML);
                if (this.mode === 'animation') {
                    const animationTime = `${1000 / this.speed * (itemsAmount + 1)}s`;
    
                    this.elements.content.classList.add('_active');
                    this.elements.contentClone.classList.add('_active');
                    
                    this.elements.content.style.animationDuration = animationTime;
                    this.elements.contentClone.style.animationDuration = animationTime;
                } else if (this.mode === 'scroll') {
                    this.scrollHandler = () => {
                        if (this.approvedCount < this.approvedThreshold) {
                            const newModalHeight = this.elements.contentClone.clientWidth;
                            if (this.modalHeight === newModalHeight) {
                                this.approvedCount++;
                            } else {
                                this.approvedCount = 0;
                            }
                            this.modalHeight = newModalHeight;
                        }
                        const offset = window.scrollY % this.modalHeight;
                        const value = `translateX(-${offset}px)`;
                        
                        this.elements.content.style.transform = value;
                        this.elements.content.style.webkitTransform = value;
                        this.elements.content.style.mozTransform = value;
                        this.elements.content.style.msTransform = value;
                        this.elements.content.style.oTransform = value;
    
                        this.elements.contentClone.style.transform = value;
                        this.elements.contentClone.style.webkitTransform = value;
                        this.elements.contentClone.style.mozTransform = value;
                        this.elements.contentClone.style.msTransform = value;
                        this.elements.contentClone.style.oTransform = value;
                    }
                    if (!this.isOnScrollBinded) {
                        window.addEventListener('scroll', this.scrollHandler);
                        this.isOnScrollBinded = true;
                    }
                } else {
                    console.warn('Invalid CommonTicker parameter "mode":', this.mode);
                }
            }
            if (!this.cssLoaded) {
                initHeadlineContent();
                window.addEventListener('load', () => {
                    initHeadlineContent();
                });
            } else {
                initHeadlineContent();
            }
        }
    }
}