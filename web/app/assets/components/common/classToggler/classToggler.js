class CommonClassToggler {
    static selector = '[data-c-class-toggler]';
    
    constructor(element) {
        const target = document.querySelector(element.getAttribute('data-c-class-toggler-selector'));
        const classToToggle = element.getAttribute('data-c-class-toggler-name');

        element.addEventListener('click', () => {
            target.classList.toggle(classToToggle);
        });

    }
}

export default CommonClassToggler;