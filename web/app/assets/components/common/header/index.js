import Vue from 'vue';
import { mapState } from 'vuex';

import config from '../../../config';

export default Vue.component('common-header', {
    delimiters: config.vue.delimiters,
    data: () => ({
        example: 'common-header data example',
    }),
    mounted() {
    },
    computed: mapState({
        stateValue: state => state.value,
        testValue: state => state.test.value,
    }),
});