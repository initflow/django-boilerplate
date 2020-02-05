const state = {
    contacts: {
        phone: {
            value: '09990009900',
            valueFormatted: '0 (999) 000-99-00',
        },
        socials: [
            {
                title: 'facebook',
                icon: 'facebook',
                href: '#',
            },
            {
                title: 'youtube',
                icon: 'youtube',
                href: '#',
            },
            {
                title: 'instagram',
                icon: 'instagram',
                href: '#',
            },
            {
                title: 'linkedin',
                icon: 'linkedin',
                href: '#',
            },
        ],
    },
    currency: {
        name: {
            short: 'руб.',
        },
        symbol: '₽',
    },
    company: {
        name: 'django_boilerplate',
    },
};

const getters = {
    contacts(state) {
        return state.contacts;
    },
    currency(state) {
        return state.currency;
    },
    company(state) {
        return state.company;
    },
};

const actions = {
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
