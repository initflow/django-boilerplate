// v.1.1.1 - 30.07.19
import Vue from 'vue';
import store from './store';
import utils from './utils';
import config from './config';

utils.dom.bindLoadListener();
utils.common.updateDjangoScriptTags();

const app = new Vue({
    el: document.querySelector(config.vue.rootSelector),
    store,
    delimiters: config.vue.delimiters,
    data: {
    },
    mounted() {
        console.log('app mounted');
    },
    methods: {
    },
});

export default app;