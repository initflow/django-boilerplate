import client from './_client';
import config from '../../config';
import { EventsModel } from './models';

// Get Events
export const getEvents = (params = {}) => {
  return client.request({
    url: config.api.events.list,
    method: 'GET',
    params: params,
    transformData: data => new EventsModel(data),
  });
};

// Get LIVE Events
export const getLiveEvents = (params = {}) => {
  return client.request({
    url: config.api.events.live,
    method: 'GET',
    params: {
      ...params,
    },
    transformData: data => new EventsModel(data),
  });
};

// Get Event
export const getEventsItem = (params = {}) => {
  return client.request({
    url: config.api.events.item,
    method: 'GET',
    params: params,
    transformData: data => new EventsModel(data),
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