import client from '../_client';
import config from '~/config';
import utils from '~/utils';

export const applyVoucher = (data = {}) => {
    return client.request({
        url: config.api.vouchers.apply,
        method: 'POST',
        data,
    });
};

export const removeVoucher = (data = {}) => {
    return client.request({
        url: config.api.vouchers.remove,
        method: 'POST',
        data,
    });
};

export const addToCart = (data = {}) => {
    return client.request({
        url: config.api.basket.add,
        method: 'POST',
        headers: {
            'X-CSRFToken': utils.common.getCSRFToken(),
        },
        data,
    });
};

export const getCart = (params = {}) => {
    return client.request({
        url: config.api.basket.get,
        method: 'GET',
        params,
    });
};

export const clearCart = (params = {}) => {
    return client.request({
        url: config.api.basket.clear,
        method: 'DELETE',
        headers: {
            'X-CSRFToken': utils.common.getCSRFToken(),
        },
        params,
    });
};
