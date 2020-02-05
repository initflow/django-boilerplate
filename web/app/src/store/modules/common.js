const state = {
    bodyFixedCounter: 0,
};

const getters = {
    isBodyFixed(state) {
        return state.bodyFixedCounter > 0;
    },
};

const actions = {
};

const mutations = {
    increaseBodyFixedCounter(state) {
        state.bodyFixedCounter++;
    },
    modifyBodyFixedCounter(state, payload) {
        state.bodyFixedCounter += payload;
    },
    decreaseBodyFixedCounter(state) {
        state.bodyFixedCounter--;
    },
    nullifyBodyFixedCounter(state) {
        state.bodyFixedCounter = 0;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
