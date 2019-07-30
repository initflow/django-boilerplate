import Vue from 'vue';
import config from '../../../config';

export default Vue.component('common-counter', {
    delimiters: config.vue.delimiters,
    template: '<span>[[ count ]]</span>',
    data: () => ({
        count: 0,
    }),
    mounted() {
        setInterval(() => {
            this.count += 1;
        }, 1000);
    },
});