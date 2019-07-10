import { isIE } from '../../../../utils/common';

export default class PluginAboutHeadline {
    static singleton = true;
    static code = 'p-about-headline';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;

    vueComponent = null;
    root = null;
    elements = {
        spot: null,
    };

    onEntryElement = (element) => {
        this.dataCode = this.constructor.dataCode;
        this.root = element;
        window.app.initInstanceElements(this);

        if (isIE()) {
            this.elements.spot.classList.add('_hidden');
            console.log('IE detected!');
        }
    }
}