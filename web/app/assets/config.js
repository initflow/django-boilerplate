export const api = {
    events: {
        list: '/event/', // all events
        live: '/event/live/', // all live
        item: '/event/', // events item (/:id)
    },
    user: {
        checkEmail: '/accounts/email_exist/', // check if email exist
        login: '/accounts/login/',
        logout: '/accounts/logout/',
        register: '/accounts/register/',
        update: '/accounts/update/',
        password: '/accounts/password/',
    },
};

export const bodyAttributes = {
    loaded: 'data-app-loaded',
};

export const vue = {
    delimiters: ['[[', ']]'],
    rootSelector: '[data-app]',
};

export const localStorage = {
    keyPrefix: 'newHolland',
};

export const languages = [
    {
        code: 'ru',
        title: 'Eng'
    }
];

const config = {
    api,
    bodyAttributes,
    vue,
    localStorage,
    languages,
};

export default config;