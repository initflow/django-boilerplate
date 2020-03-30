import axios from 'axios';

class Client {
    constructor() {
        this.axios = axios.create({
            // baseURL: config.api.baseUrl,
            baseURL: '',
            responseType: 'json',
        });
    }

    prepareResponse = (res) => {
        const response = {
            data: null,
            error: null,
            headers: {},
            status: null,
        };

        if (res.data) {
            if (res.data.data && typeof res.data.data === 'object' && !Array.isArray(res.data.data)) {
                response.data = res.data.data;
            } else {
                response.data = res.data;
            }
            if (res.data.error) {
                response.error = { message: res.data.error };
            }
        }

        if (res.headers) {
            response.headers = res.headers;
        }
        if (res.status) {
            response.status = res.status;
        }

        return response;
    }

    prepareError = (res) => {
        const response = {
            data: null,
            error: null,
            headers: {},
            status: null,
        };
        const parseError = (source) => {
            let result = 'Unknown Error';
            if (Array.isArray(source)) {
                // error is an array case:
                result = source.join(';\n');
            } else if (typeof source === 'object') {
                // error is an object case:
                if (source.non_field_errors !== undefined) {
                    result = source.non_field_errors.join(';\n');
                } else {
                    // if there is only one field in object and it is String
                    // return this field value as error message
                    const keys = Object.keys(source);
                    if (keys.length === 1 && typeof source[keys[0]] === 'string') {
                        result = source[keys[0]];
                    }
                }
            } else {
                result = source;
            }
            return result;
        };

        if (res.response) {
            if (res.response.data) {
                if (res.response.data.error) {
                    response.error = parseError(res.response.data.error);
                } else {
                    response.error = parseError(res.response.data);
                }
            } else {
                response.error = { error: null };
            }
            if (res.response.headers) {
                response.headers = res.response.headers;
            }
            if (res.response.status) {
                response.status = res.response.status;
            }
        } else if (res.message) {
            response.error = res.message;
        } else {
            response.error = 'Network error';
        }

        return response;
    }

    request = async(options) => {
        const transformRequest = options.transformRequest;
        delete options.transformRequest;
        const transformError = options.transformError;
        delete options.transformError;
        const transformResponse = options.transformResponse;
        delete options.transformResponse;

        let response = null;
        let isError = false;

        if (transformRequest !== undefined) {
            try {
                if (options.params !== undefined) {
                    options.params = transformRequest(options.params);
                }
                if (options.data !== undefined) {
                    options.data = transformRequest(options.data);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        }

        await this.axios.request(options)
            .then(res => {
                response = this.prepareResponse(res);
            })
            .catch(res => {
                isError = true;
                response = this.prepareError(res);
            });

        if (response !== null) {
            if (transformError !== undefined || transformResponse !== undefined) {
                try {
                    if (isError && transformError !== undefined) {
                        response.rawError = response.error;
                        response.error = transformError(response.error);
                    }
                    if (!isError && transformResponse !== undefined) {
                        response.data = transformResponse(response.data);
                    }
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            }
        }

        return response;
    }
}

const client = new Client();

export default client;
