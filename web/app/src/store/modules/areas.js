import { mainClient } from '~/network';

const state = {
    items: [],
    current: null,
    isLoading: true,
};

const getters = {
    items(state) {
        return state.items;
    },
    current(state) {
        return state.current;
    },
};

const actions = {
    async getItems({ state, commit }, payload = {}) {
        if (state.isLoading === 'loading') {
            return;
        }

        state.isLoading = true;

        const { data, error, status } = await mainClient.areas.getItems(payload);
        if (error) {
            console.error(error, status);
            console.error('Error above relates to store/areas getItems action');
            state.items = [];
        } else if (data) {
            // TODO: add network model
            state.items = data.results;
            commit('setCurrent');
        }

        state.isLoading = false;
    },
};

const mutations = {
    setCurrent(state) {
        if (state.items.length === 0) {
            return;
        }
        const currentDomain = window.location.host;
        if (currentDomain === 'localhost') {
            state.current = state.items[0];
        }
        const relatedArea = state.items.find(x => x.site.domain === currentDomain);
        if (relatedArea) {
            state.current = relatedArea;
        } else {
            state.current = state.items[0];
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
