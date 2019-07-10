import CommonModal from '../../modal';
import template from './generic.pug';

class ModalGeneric {
    modal = null;

    constructor(options) {

        let content = document.createElement('div');
        content.innerHTML = template(options).trim();
        content = content.firstChild;
        this.modal = new CommonModal({
            content: content,
        });

        if (options.buttons && options.buttons.length > 0) {
            content.querySelectorAll('[data-c-modal-generic-element="button"]').forEach((button, index) => {
                button.addEventListener('click', () => {
                    options.buttons[index].callback ? options.buttons[index].callback() : (()=>{})();
                });
            });
        }
        
    }

    close = () => {
        if (this.modal !== null) {
            this.modal.destroy();
            this.modal = null;
        }
    }
}

export default ModalGeneric;