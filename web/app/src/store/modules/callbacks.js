import config from '~/config';

const localStorageKey = `${config.localStorage.prefix}${config.localStorage.affixes.callbacks}`;
const getLocalStorage = () => window.localStorage.getItem(localStorageKey);
const initialLocalstorage = JSON.parse(getLocalStorage());

const initialRedirects = initialLocalstorage && initialLocalstorage.redirects ? initialLocalstorage.redirects : [];
const initialModals = initialLocalstorage && initialLocalstorage.modals ? initialLocalstorage.modals : [];

const state = {
    redirects: initialRedirects,
    modals: initialModals,
};

const getters = {
};

const actions = {
    execute({ commit, dispatch }) {
        dispatch('executeRedirect');
        dispatch('executeModals');
    },
    registerRedirect({ state, commit }, payload) {
        state.redirects.push(payload);
        commit('updateLocalStorage');
    },
    registerModal({ state, commit }, payload) {
        state.modals.push(payload);
        commit('updateLocalStorage');
    },
    executeRedirect({ state, commit }) {
        if (state.redirects.length === 0) {
            return;
        }
        const redirect = state.redirects[state.redirects.length - 1];
        if (redirect.condition !== undefined) {
            if (redirect.condition.type === 'urlShouldContent') {
                if (window.location.href.indexOf(redirect.condition.value) === -1) {
                    return;
                }
            } else {
                console.error(new Error('Wrong redirect callback condition'));
                console.error('Error above relates to store callbacks executeRedirect action');
                return;
            }
        }
        state.redirects.pop();
        commit('updateLocalStorage');
        if (redirect.url !== window.location.href) {
            window.location.assign(redirect.url);
        }
    },
    executeModals({ state, commit }) {
        if (state.modals.length === 0) {
            return;
        }
        state.modals.forEach(m => commit('modals/push', m, { root: true }));
        state.modals = [];
        commit('updateLocalStorage');
    },
};

const mutations = {
    updateLocalStorage(state) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
