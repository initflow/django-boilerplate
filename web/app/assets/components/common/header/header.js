import Vue from 'vue';
import store from '../../../utils/vueStorage';
import { getCurrentLanguage } from '../../../utils/common';
import { mainClient } from '../../../network';
import config, { translations } from '../../../config';

export default class CommonHeader {
    static singleton = true;
    static selector = '[data-c-header]';
    
    vueComponent = null;

    onEntryElement = (element) => {
        this.vueComponent = new Vue({
            el: element,
            delimiters: ['[[', ']]'],
            store,
            data: {
                languages: Object.keys(translations),
                language: getCurrentLanguage(),
                search: {
                    isOpened: false,
                    timeout: null,
                    query: '',
                    results: null,
                },
                isOpenedMenu: false,
                isOpenedLive: false,
                isOpenedRadio: false,
            },
            mounted() {
                document.addEventListener('click', this.closeAll.bind(this), false);
            },
            methods: {
                switchLanguage(newLanguage) {
                    window.location.href = window.location.href.replace(`/${this.language}/`, `/${newLanguage}/`);
                    this.language = newLanguage;
                },
                toggleSearch() {
                    if (!this.search.isOpened) {
                        window.app.getComponentInstanceByName('LayoutGlobal').fixBody();
                        this.$refs.searchInput.focus();
                    } else {
                        window.app.getComponentInstanceByName('LayoutGlobal').unfixBody();
                        this.$refs.searchInput.blur();
                    }
                    this.isOpenedMenu = false;
                    this.isOpenedLive = false;
                    this.isOpenedRadio = false;
                    this.search.isOpened = !this.search.isOpened;
                },
                closeSearch() {
                    this.search.isOpened = false;
                    window.app.getComponentInstanceByName('LayoutGlobal').unfixBody();
                },
                async submitSearch() {
                    if (this.search.query.length > 0) {
                        this.search.status = 'loading';
                        const { data, error, status } = await mainClient.events.getEvents({
                            q: this.search.query,
                        });
                        if (error !== null) {
                            console.warn(error, status);
                        } else {
                            this.search.results = data.items.map(item => {
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
                        }
                        this.search.status = 'loaded';
                    } else if (this.search.results !== null) {
                        this.search.results = null;
                    }
                },
                isCurrentSearchItem(item) {
                    if (item.audio) {
                        return this.track && this.track.id === item.audio.id;
                    }
                },
                isPlayingSearchItem(item) {
                    if (item.audio) {
                        return this.isCurrentSearchItem(item) && store.state.track.playback === 'playing';
                    }
                },
                isPausedSearchItem(item) {
                    if (item.audio) {
                        return this.isCurrentSearchItem(item) && store.state.track.playback === 'paused';
                    }
                },
                isLoadingSearchItem(item) {
                    if (item.audio) {
                        return this.isCurrentSearchItem(item) && store.state.track.playback === 'loading';
                    }
                },
                searchPlay(item) {
                    if (item.audio) {
                        if (this.isCurrentSearchItem(item)) {
                            store.commit('playback', 'playing');
                        } else {
                            store.commit('track', item.audio);
                        }
                    }
                },
                searchPause() {
                    store.commit('playback', 'paused');
                },
                debounceSearch() {
                    if (this.search.timeout !== null) {
                        clearTimeout(this.search.timeout);
                        this.search.timeout = null;
                    }
                    this.search.timeout = setTimeout(this.submitSearch.bind(this), 333);
                },
                getHighlightedName(name) {
                    if (this.search.query.length > 0) {
                        const regexp = new RegExp(this.search.query, 'gi');
                        return name.replace(regexp, match => `<i>${match}</i>`);
                    }
                },
                toggleMenu() {
                    this.isOpenedMenu = !this.isOpenedMenu;
                    this.isOpenedLive = false;
                    this.isOpenedRadio = false;
                    this.search.isOpened = false;
                },
                toggleLive() {
                    if (!this.isPlaying('live')) {
                        this.play('live');
                    }
                    this.isOpenedMenu = false;
                    this.isOpenedLive = !this.isOpenedLive;
                    this.isOpenedRadio = false;
                    this.search.isOpened = false;
                },
                toggleRadio() {
                    if (!this.isPlaying('radio')) {
                        this.play('radio');
                    }
                    this.isOpenedMenu = false;
                    this.isOpenedLive = false;
                    this.isOpenedRadio = !this.isOpenedRadio;
                    this.search.isOpened = false;
                },
                closeAll() {
                    this.isOpenedMenu = false;
                    this.isOpenedLive = false;
                    this.isOpenedRadio = false;
                },
                play(stream) {
                    if (this[stream].isOnline) {
                        if (this.isCurrent(stream)) {
                            store.commit('playback', 'playing');
                        } else {
                            store.commit('track', this[stream].track);
                        }
                    }
                },
                pause() {
                    store.commit('playback', 'paused');
                },
                isCurrent(stream) {
                    return this.track && this.track.id === this[stream].track.id;
                },
                isPlaying(stream) {
                    return this.isCurrent(stream) && store.state.track.playback === 'playing';
                },
                isPaused(stream) {
                    return this.isCurrent(stream) && store.state.track.playback === 'paused';
                },
                isLoading(stream) {
                    return this.isCurrent(stream) && store.state.track.playback === 'loading';
                },
            },
            computed: {
                live() {
                    return store.state.live;
                },
                radio() {
                    return store.state.radio;
                },
                track() {
                    return store.state.track;
                },
            },
            watch: {
            },
        });
    }
}