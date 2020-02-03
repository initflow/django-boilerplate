export const customParamsSerializer = (params) => {
    const parts = [];
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            const obj = params[key];
            if (Array.isArray(obj)) {
                for (let idx = 0; idx < obj.length; idx++) {
                    parts.push(key + '=' + encodeURIComponent(obj[idx]));
                }
            } else {
                parts.push(key + '=' + encodeURIComponent(obj));
            }
        }
    }
    return parts.join('&');
};

export const parseError = (error, valuesOnly = false) => {
    let result = '';
    const extractObject = (object) => {
        try {
            Object.keys(object).forEach(key => {
                if (object[key]) {
                    if (!valuesOnly) {
                        extract(key);
                    }
                    extract(object[key]);
                }
            });
        } catch (error) {
        }
    };
    const extractArray = (array) => {
        try {
            array.forEach(extract);
        } catch (error) {
        }
    };
    const extract = (item) => {
        if (!item) {
            return;
        }
        try {
            if (typeof item === 'object') {
                if (Array.isArray(item)) {
                    extractArray(item);
                } else {
                    extractObject(item);
                }
            } else {
                result += `${result.length === 0 ? '' : ':'} ${item}`;
            }
        } catch (error) {
        }
    };
    extract(error);
    return result;
};

export const getCSRFToken = () => {
    const token = document.querySelector('[name="csrfmiddlewaretoken"]');
    if (!token) {
        console.error('CSRF token not found');
        return '';
    }
    return document.querySelector('[name="csrfmiddlewaretoken"]').value;
};

export default {
    customParamsSerializer,
    parseError,
    getCSRFToken,
};
