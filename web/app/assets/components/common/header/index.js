import Vue from 'vue';
import { mapState } from 'vuex';

import config from '../../../config';

export default Vue.component('common-header', {
    delimiters: config.vue.delimiters,
    data: () => ({
        headerData: 'I`m header data!',
    }),
    mounted() {
        console.log(this.stateValue, this.testValue);
    },
    computed: mapState({
        stateValue: state => state.value,
        testValue: state => state.test.value,
    }),
});