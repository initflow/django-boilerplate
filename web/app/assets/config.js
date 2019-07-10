import { getCurrentLanguage } from './utils/common';

export const api = {
    baseUrl: `/${getCurrentLanguage()}/`,
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

export const translations = {
    ru: {},
    en: {},
};

export const mediaTypes = {
    live: {
        audio: ['radioco_live'],
        video: ['vimeo_live'],
    },
    static: {
        audio: ['audio_url'],
        video: ['vimeo'],
    },
};

export const sources = {
    'radio.co': {
        baseUrl: '',
        radio: {
            id: 'sb260bd9e3',
            status: {
                urlPrefix: 'https://public.radio.co/stations/',
                urlAffix: '/status',
            },
            source: {
                urlPrefix: 'https://s3.radio.co/',
                urlAffix: '/listen',
            },
        },
        live: {
            id: 's1f26345be',
            // id: 'sb260bd9e3',
            status: {
                urlPrefix: 'https://public.radio.co/stations/',
                urlAffix: '/status',
            },
            source: {
                urlPrefix: 'https://s3.radio.co/',
                urlAffix: '/listen',
            },
        },
    }
};

const config = {
    api,
    localStorage,
    translations,
    mediaTypes,
    sources,
};


export default config;