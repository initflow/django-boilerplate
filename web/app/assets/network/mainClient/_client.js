import axios from 'axios';

import config from '../../config';
import { getCurrentLanguage } from '../../utils/i18n';
import { ErrorModel } from './models';

class Client {
    constructor() {
        this.axios = axios.create({
            baseUrl: `/${getCurrentLanguage()}/`,
            responseType: 'json'
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
                // if (typeof res.data.error === 'string') {
                // response.error = new ErrorModel({ message: res.data.error });
                // } else {
                // response.error = new ErrorModel(res.data.error);
                // }
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
            status: null
        };
        if (res.response) {
            // if (res.response.error) {
            //   if (typeof res.response.error === 'string') {
            //     response.error = {res.response.error}
            //   }
            // }
            if (res.response.data) {
                if (res.response.data.error) {
                    // response.error = new ErrorModel(res.response.data.error);
                    response.error = res.response.data.error;
                } else {
                    // response.error = new ErrorModel(res.response.data);
                    response.error = res.response.data;
                }
            } else {
                // response.error = new ErrorModel({});
                response.error = { error: null };
            }



            if (res.response.headers) {
                response.headers = res.response.headers;
            }
            if (res.response.status) {
                response.status = res.response.status;
            }
        } else if (res.message) {
            // response.error = new ErrorModel(res);
            response.error = { error: res };
        } else {
            // response.error = new ErrorModel({
            //   message: 'Network error'
            // });
            response.error = { error: 'Network error' };
        }


        return response;
    }

    request = async (options) => {
        const transformData = options.transformData;
        delete options.transformData;

        let response = null;

        // const token = await CredentialsStorage.getAccessToken();

        // if (token !== null) {
        //   options.headers = {
        //     ...options.headers,
        //     'Authorization': `Bearer ${token.accessToken}`
        //   };
        // }

        await this.axios.request(options)
            .then(res => response = this.prepareResponse(res))
            .catch(res => response = this.prepareError(res));

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
