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

export default {
    customParamsSerializer,
};