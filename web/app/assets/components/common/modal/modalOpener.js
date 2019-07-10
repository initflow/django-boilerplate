import ModalUnderDevelopment from './components/underDevelopment/underDevelopment';
import ModalGeneric from './components/generic/generic';

class CommonModalOpener {
    static singleton = true;
    static selector = '[data-c-modal-opener],[href="#__dev__"],[href="None"]';

    modalConfigs = {
        underDevelopment: ModalUnderDevelopment,
        generic: ModalGeneric,
    }

    onEntryElement = (element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (element.dataset.cModalOpener === undefined) {
                this.openModal('underDevelopment');
            } else {
                if (element.dataset.cModalOptions !== undefined) {
                    this.openModal(element.dataset.cModalOpener, JSON.parse(element.dataset.cModalOptions));
                } else {
                    this.openModal(element.dataset.cModalOpener);
                }
            }
        });
    }

    openModal = (name, options = {}) => {
        let ModalConfig = name in this.modalConfigs ? this.modalConfigs[name] : this.modalConfigs.underDevelopment;
        return new ModalConfig(options);
    }
}

export default CommonModalOpener;


// open modal from code:
// app.getComponentInstanceByName('CommonModalOpener').openModal('question');