export default class CommonFooter {
    static singleton = true;
    static code = 'c-footer';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;
    
    vueComponent = null;
    root = null;
    elements = {
        scroller: null,
    };

    onEntryElement = (element) => {
        this.dataCode = this.constructor.dataCode;
        this.root = element;
        this.initElements();
        this.initScroller();
    }

    initElements() {
        this.elements.scroller = this.root.querySelector(`[${this.dataCode}-element="scroller"]`);
    }

    initScroller() {
        if (this.elements.scroller !== null) {
            this.elements.scroller.addEventListener('click', () => {

                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({top: 0, behavior: 'smooth'});
                } else {
                    window.scrollTo(0, 0);
                }
            });
        }
    }
}