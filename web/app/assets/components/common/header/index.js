import Vue from 'vue';

export default Vue.component('c-header', {
    delimiters: ['[[', ']]'],
    data: () => ({
        headerData: 'I`m header data!',
    }),
});