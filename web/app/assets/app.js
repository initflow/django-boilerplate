// v.1.1.0 - 29.07.19
import Vue from 'vue';
import store from './store';

const cmsScripts = document.querySelectorAll('script[data-cms]');
console.log(cmsScripts.length);
for (let i = 0; i < cmsScripts.length; i++) {
    const script = cmsScripts[i];
    script.setAttribute('type', 'application/javascript');
}

const app = new Vue({
    el: document.querySelector('[data-app]'),
    store,
    delimiters: ['[[', ']]'],
    data: {
        test: 'test text 111',
    },
    mounted() {
        console.log(this.test);
    },
    methods: {
        testMethod() {
            this.test = this.test === 'new test text' ? 'test text 111' : 'new test text';
        }
    },
});
window.app = app;

export default app;