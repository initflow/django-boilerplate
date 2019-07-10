import Vue from 'vue';
import store from '../../../../utils/vueStorage';
import moment from 'moment';
import { mainClient } from '../../../../network';
import config from '../../../../config';

export default class PluginEventsList {
    static singleton = true;
    static code = 'p-events-list';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;
    
    vueComponent = null;

    onEntryElement = (element) => {
        this.dataCode = this.constructor.dataCode;

        this.vueComponent = new Vue({
            el: element,
            delimiters: ['[[', ']]'],
            store,
            data: {
                mode: element.getAttribute(`${this.dataCode}-mode`) || 'actual', // actual | archive
                items: [],
                pagination: {
                    size: 6,
                    total: 0,
                    current: 0,
                },
                status: 'loaded',
                error: null,
            },
            mounted() {
                this.getEvents();
            },
            methods: {
                async getEvents() {
                    this.status = 'loading';
                    const params = {
                        page_size: this.pagination.size,
                        page: ++this.pagination.current,

                    };
                    const date = `${moment().utcOffset(3).format('YYYY-MM-DD[T]')}00:00:00.000`;
                    if (this.mode === 'actual') {
                        params.start_date__gte = date;
                        params.ordering = 'start_date';
                    } else {
                        params.start_date__lte = date;
                        params.ordering = '-start_date';
                    }
                    const { data, error, status } = await mainClient.events.getEvents(params);
                    if (error !== null) {
                        console.warn(error, status);
                        this.error = `Error: ${status}`;
                    } else {
                        this.error = null;
                        const dataWithAudio = data.items.map(item => {
                            let audio = item.media_set.find(media => config.mediaTypes.static.audio.indexOf(media.type.name) > -1);
                            if (audio !== undefined) {
                                audio = {
                                    id: audio.pk,
                                    source: audio.url,
                                    type: 'mp3',
                                    name: item.name,
                                    author: null,
                                    image: item.promo_image,
                                    playback: null,
                                };
                            } else {
                                audio = null;
                            }
                            return {
                                ...item,
                                audio
                            }
                        });
                        this.items = [...this.items, ...dataWithAudio];
                        this.pagination.total = Math.ceil(data.total / this.pagination.size);
                    }
                    this.status = 'loaded';
                },
                isCurrent(item) {
                    if (item.audio) {
                        return store.state.track && store.state.track.id === item.audio.id;
                    }
                },
                isPlaying(item) {
                    if (item.audio) {
                        return this.isCurrent(item) && store.state.track.playback === 'playing';
                    }
                },
                isPaused(item) {
                    if (item.audio) {
                        return this.isCurrent(item) && store.state.track.playback === 'paused';
                    }
                },
                isLoading(item) {
                    if (item.audio) {
                        return this.isCurrent(item) && store.state.track.playback === 'loading';
                    }
                },
                play(item) {
                    if (item.audio) {
                        if (this.isCurrent(item)) {
                            store.commit('playback', 'playing');
                        } else {
                            store.commit('track', item.audio);
                        }
                    }
                },
                pause() {
                    store.commit('playback', 'paused');
                },
                getFormattedDate(date) {
                    return moment(date).format('DD MMMM YYYY, HH:mm');
                },
            },
            computed: {
                liveId() {
                    return store.state.live.event.id;
                },
            },
            watch: {
            },
        });
    }
}