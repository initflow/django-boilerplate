import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';

const radioSource = 'radio.co';
const radioConfig = config.sources[radioSource].radio;

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        live: {
            isOnline: null,
            track: {
                id: 'live',
                source: null,
                type: 'stream',
                name: null,
                author: null,
                image: null,
                playback: null,
            },
            video: {
                id: 'live',
                source: null,
                type: null,
            },
            event: {
                id: null,
                name: null,
                description: null,
                image: null,
                url: null,
            }
        },
        radio: {
            isOnline: null,
            track: {
                id: 'radio',
                source: null,
                type: 'stream',
                name: null,
                author: null,
                image: null,
                playback: null,
            },
        },
        track: {
            id: null,
            source: null,
            type: null,
            name: null,
            author: null,
            image: null,
            playback: null,
        },
    },
    mutations: {
        live(state, newLive) {
            state.live = newLive;
        },
        radio(state, newRadio) {
            state.radio = newRadio;
        },
        track(state, newTrack) {
            state.track = newTrack;
        },
        deactivate(state) {
            state.track = {
                id: null,
                source: null,
                type: null,
                name: null,
                author: null,
                image: null,
                playback: null,
            }
        },
        playback(state, newPlaybackState) {
            Vue.set(state.track, 'playback', newPlaybackState);
        },
    },
    actions: {
    },
    getters: {
        track : state => {
            return state.track.id !== null && state.track.source !== null ? state.track : null;
        },
        isStream: state => {
            return state.track !== null && state.track.type === 'stream';
        },
        playback: state => {
            return state.track.id !== null && state.track.source !== null ? state.track.playback : null;
        },
        isPaused: (state, getters) => {
            return getters.playback === 'paused';
        },
        isPlaying: (state, getters) => {
            return getters.playback === 'playing';
        },
        isLoading: (state, getters) => {
            return getters.playback === 'loading';
        },
    }
});

export default store;