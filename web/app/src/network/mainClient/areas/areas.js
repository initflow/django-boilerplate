import config from '~/config';
import client from '../_client';
import transforms from './transforms';

export const getItems = (params = {}) => {
    return client.request({
        url: config.api.areas.list,
        method: 'GET',
        params,
        transformRequest: transforms.requests.getItems,
        transformResponse: transforms.responses.getItems,
    });
};
