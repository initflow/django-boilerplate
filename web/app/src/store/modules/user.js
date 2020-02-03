import { mainClient } from '~/network';

const state = {
    user: null,
    isLoading: true,
};

const getters = {
    user(state) {
        return state.user;
    },
};

const actions = {
    async getUser({ state, commit }) {
        if (state.isLoading === 'loading') {
            return;
        }

        state.isLoading = true;

        const { data, error, status } = await mainClient.user.checkLogin();
        if (error) {
            console.error(error, status);
            console.error('Error above relates to store/user getUser action');
            state.user = null;
        } else if (data) {
            state.user = data;
        }

        state.isLoading = false;
    },
};

const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
