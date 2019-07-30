import Vue from 'vue';

export default Vue.component('c-counter', {
    delimiters: ['[[', ']]'],
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