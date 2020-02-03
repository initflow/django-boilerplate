import client from '../_client';
import config from '~/config';

// Subscribe
export const subscribe = (data = {}) => {
    return client.request({
        url: config.api.subscribe,
        method: 'POST',
        data,
    });
};

// Search
export const search = (params = {}) => {
    return client.request({
        url: config.api.search,
        method: 'GET',
        params,
    });
};
