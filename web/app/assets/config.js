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

export const localStorage = {
    keyPrefix: 'newHolland',
};

export const translations = [
    {
        code: 'ru',
        name: 'Eng'
    }
];

const config = {
    api,
    translations,
    localStorage,
};

export default config;