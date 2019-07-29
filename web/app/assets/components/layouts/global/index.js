import Vue from 'vue';
import store from '../../../store';

export default Vue.component('l-global', {
    delimiters: ['[[', ']]'],
    store,
    data: () => ({
    }),
    mounted() {
        console.log('LayoutGlobal loaded');
    },
});