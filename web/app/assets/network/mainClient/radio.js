import client from './_client';
import config from '../../config';
import { RadioModel } from './models';

// Check Radio
export const checkStatus = (params = {}) => {
  const radioConfig = config.sources[params.source].radio;
  return client.request({
    baseUrl: config.sources[params.source].baseUrl,
    url: `${radioConfig.status.urlPrefix}${radioConfig.id}${radioConfig.status.urlAffix}`,
    method: 'GET',
    params: {},
    transformData: data => new RadioModel({
      status: data.status,
      ...data
    }),
  });
};

// // Check Live
// export const checkLiveStatus = (params = {}) => {
//   return client.request({
//     baseUrl: '',
//     url: `https://public.radio.co/stations/${params.liveId}/status`,
//     method: 'GET',
//     params: params,
//     transformData: data => new StatusModel({
//       status: data.status,
//       ...data
//     })
//   });
// };