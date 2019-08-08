import Vue from 'vue';
import store from '../../../store';

export default Vue.component('layout-global', {
    delimiters: ['[[', ']]'],
    store,
    data: () => ({
    }),
    mounted() {
        console.log('LayoutGlobal loaded');
    },
});