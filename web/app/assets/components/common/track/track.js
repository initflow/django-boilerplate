import Vue from 'vue';
import store from '../../../utils/vueStorage';

export default class CommonTrack {
    static singleton = true;
    static selector = '[data-c-track]';

    vueComponent = null;

    onEntryElement = (element) => {
        this.vueComponent = new Vue({
            el: element,
            delimiters: ['[[', ']]'],
            store,
            data: {
                track: {
                    id: element.getAttribute('data-c-track-id') || -1,
                    name: element.getAttribute('data-c-track-name') || 'Unknown track',
                    type: element.getAttribute('data-c-track-type') || 'mp3',
                    source: element.getAttribute('data-c-track-source') || 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
                    image: element.getAttribute('data-c-track-image') || false,
                    author: element.getAttribute('data-c-track-author') || 'Unknown author',
                    playback: null,
                }
            },
            methods: {
                play() {
                    if (this.isCurrentTrack) {
                        store.commit('playback', 'playing');
                    } else {
                        store.commit('track', this.track);
                    }
                },
                pause() {
                    store.commit('playback', 'paused');
                },
            },
            computed: {
                isCurrentTrack() {
                    return store.state.track !== null && store.state.track.id === this.track.id;
                },
                isPlaying() {
                    return store.getters.isPlaying;
                },
                isLoading() {
                    return store.getters.isLoading;
                },
            },
        });

    }
}