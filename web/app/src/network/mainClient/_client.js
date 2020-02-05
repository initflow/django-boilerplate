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
        if (res.response) {
            if (res.response.data) {
                if (res.response.data.error) {
                    response.error = res.response.data.error;
                } else {
                    response.error = res.response.data;
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
            response.error = { error: res };
        } else {
            response.error = { error: 'Network error' };
        }

        return response;
    }

    request = async(options) => {
        const transformData = options.transformData;
        delete options.transformData;

        let response = null;

        await this.axios.request(options)
            .then(res => {
                response = this.prepareResponse(res);
            })
            .catch(res => {
                response = this.prepareError(res);
            });

        if (transformData && response !== null) {
            response.rawData = response.data;
            try {
                response.data = transformData(response.data);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        }

        return response;
    }
}

const client = new Client();

export default client;
