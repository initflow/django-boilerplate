export const api = {
    product: {
        list: '/api/product/',
        item: '/api/product/', // + id
    },
    products: '/api/products/',
    search: '/search/autocomplete/',
    register: '/api/register/',
    login: '/api/login/',
    customer: {
        update: '/api/customer/update/',
        password: '/api/customer/password/',
    },
    basket: {
        add: '/api/basket/add-product/',
        get: '/api/basket/',
        clear: '/api/basket/', // method DELETE
    },
    checkout: '/api/checkout/',
    vouchers: {
        remove: '/api/basket/delete-voucher/',
        apply: '/api/basket/add-voucher/',
    },
    batch: '/api/v1/batch/',
    subscribe: '/subscribe/',
    areas: {
        list: '/area/',
    },
};

export const bodyAttributes = {
    loaded: 'data-app-loaded',
};

export const localStorage = {
    prefix: 'django_boilerplate',
    affixes: {
        callbacks: 'CallbacksStack',
    },
};

export const translations = [];

export const urls = {
    cabinet: '/cabinet/index',
};

export const vue = {
    delimiters: ['[[', ']]'],
    rootSelector: '[data-app]',
};

export default {
    api,
    bodyAttributes,
    localStorage,
    translations,
    urls,
    vue,
};
