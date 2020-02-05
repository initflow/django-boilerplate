import client from '../_client';
import config from '~/config';
import utils from '~/utils';

// Register
export const register = (data = {}) => {
    return client.request({
        headers: {
            'X-CSRFToken': utils.common.getCSRFToken(),
        },
        url: config.api.register,
        method: 'POST',
        data,
    });
};

// Login
export const login = (data = {}) => {
    return client.request({
        url: config.api.login,
        method: 'POST',
        data,
    });
};

// Check login
export const checkLogin = (params = {}) => {
    return client.request({
        url: config.api.login,
        method: 'GET',
        params,
        transformResponse: (data) => ({
            id: data.id,
            name: `${data.first_name}${data.first_name && data.last_name ? ' ' : ''}${data.last_name}`,
            firstName: data.first_name,
            lastName: data.last_name,
            phone: data.phone_number,
            email: data.email,
        }),
    });
};

// Update
export const update = (data = {}) => {
    return client.request({
        url: config.api.customer.update,
        method: 'PUT',
        data,
    });
};

// ChangePassword
export const changePassword = (data = {}) => {
    return client.request({
        url: config.api.customer.password,
        method: 'POST',
        data,
    });
};
