import Vue from 'vue';
import config from '../../../config';

export default Vue.component('common-header', {
    delimiters: config.vue.delimiters,
    data: () => ({
        headerData: 'I`m header data!',
    }),
});