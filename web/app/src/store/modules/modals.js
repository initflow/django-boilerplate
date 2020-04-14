const state = {
    list: [],
};

const getters = {
    list(state) {
        return state.list;
    },
};

const actions = {
};

const mutations = {
    push(state, modal) {
        let itemToAdd = modal;
        if (typeof modal === 'string') {
            itemToAdd = {
                name: modal,
                props: {},
            };
        }
        if (!itemToAdd.props) {
            itemToAdd.props = {};
        }
        state.list = state.list.concat([itemToAdd]);
    },
    pop(state) {
        const length = state.list.length;
        const onClose = state.list[length - 1].props.onClose;
        if (onClose !== undefined) {
            onClose();
        }
        state.list = state.list.slice(0, state.list.length - 1);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
