import CommonModal from '../../modal';
import template from './underDevelopment.pug';

class ModalUnderDevelopment {
    modal = null;

    constructor(options) {

        let content = document.createElement('div');
        content.innerHTML = template(options).trim();
        content = content.firstChild;
        this.modal = new CommonModal({
            content: content,
        });
        
    }

    close = () => {
        if (this.modal !== null) {
            this.modal.destroy();
            this.modal = null;
        }
    }
}

export default ModalUnderDevelopment;