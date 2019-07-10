import Vue from 'vue';
import store from '../../../utils/vueStorage';
import { Listening, isIOS } from '../../../utils/common';
import config from '../../../config';

class MediaController extends Listening {

    constructor(type = 'audio', volume = 1) {
        super();
        this._type = type;
        this._volume = volume;
    }

    init = () => {
        this._source = '';
        // this._source = 'https://nh-radio-static-assets.s3.eu-north-1.amazonaws.com/audio/white-noise.wav';
        // this._source = 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3';
        this._media = document.createElement(this._type);


        this._media.ontimeupdate = (event) => this.trigger('timeUpdate', event);
        this._media.oncanplay = (event) => this.trigger('canPlay', event);
        // this._media.oncanplaythrough = (event) => this.trigger('canPlayThrough', event);
        this._media.onended = (event) => this.trigger('ended', event);
        this._media.onloadedmetadata = (event) => this.trigger('loadedMetadata', event);
        this._media.onprogress = (event) => this.trigger('progress', event);
        // this._media.onloadeddata = (event) => this.trigger('loadeddata', event);
        this._media.onwaiting = (event) => this.trigger('waiting', event);

        this._media.src = this._source;
        this._media.volume = this._volume;

        document.addEventListener('touchstart', this._mobileFix);
        document.addEventListener('mousedown', this._mobileFix);
    }

    _onUpdateSource() {
        this.media.src = this.source;
        this.media.load();
    }

    _onUpdateVolume() {
        this.media.volume = this.volume;
    }

    _mobileFix = () => {
        document.removeEventListener('touchstart', this._mobileFix);
        document.removeEventListener('mousedown', this._mobileFix);
        this.source = 'https://nh-radio-static-assets.s3.eu-north-1.amazonaws.com/audio/white-noise.wav';
        try {
            const promise = this._media.play();
            if (promise !== null && promise !== undefined) {
                promise.then(_ => {
                    this._media.pause();
                }).catch(e => {});
            }
        } catch(e) {
            console.warn(e);
        }
    }

    play() {
        if (this.media.src !== this.source) {
            this.source = this.source;
        }
        try {
            this.media.play();
        } catch (error) {
            console.warn(error);
        }
    }

    stop() {
        this.media.pause();
        this.media.src = '';
    }

    pause() {
        this.media.pause();
    }

    set media(newMedia) {
        this._media = newMedia;
    }
    get media() {
        return this._media;
    }

    set source(newSource) {
        this._source = encodeURI(decodeURI(newSource));
        this._onUpdateSource();
    }
    get source() {
        return this._source;
    }

    set volume(newVolume) {
        if (!isNaN(newVolume)) {
            this._volume = Math.max(Math.min(newVolume, 1), 0);
            this._onUpdateVolume();
        }
    }
    get volume() {
        return this._volume;
    }

    set muted(newMuted) {
        this.media.muted = newMuted;
    }
    get muted() {
        return this.media.muted;
    }

    set current(newCurrent) {
        this.media.currentTime = Math.max(Math.min(newCurrent, this.media.duration || 0), 0);
    }
    get current() {
        return this.media.currentTime;
    }

    get buffered() {
        const bufferedLength = this.media.buffered.length;
        const result = [];
        for (let i = 0; i < bufferedLength; i++) {
            result.push([this.media.buffered.start(i), this.media.buffered.end(i)]);
        }
        return bufferedLength === 0 ? false : result;
    }

    get isPlayable() {
        return this.media.readyState === 3 || this.media.readyState === 4;
    }
}

export default class CommonPlayer {
    static singleton = true;
    static selector = '[data-c-player]';
    
    vueComponent = null;

    onEntryElement = (element) => {
        this.vueComponent = new Vue({
            el: element,
            delimiters: ['[[', ']]'],
            store,
            data: {
                isMounded: false,
                isCSSloaded: false,
                isTouched: false,
                isExtended: false,
                audioController: null,
                timing: {
                    current: null,
                    total: null,
                },
                buffered: null,
                bufferBGcolor: null,
                volume: {
                    default: 1,
                    value: 1,
                    muted: false,
                },
                history: [],
                seeking: false,
                localStorage: {
                    prefix: `${config.localStorage.keyPrefix}Player`,
                    version: 'v0',
                    content: null,
                },
                mode: 'track', // 'radio' || 'live' || 'track'
            },
            mounted() {
                this.audioController = new MediaController('audio');
                this.audioController.init();
            
                this.audioController.on('canPlay', this.canplayHandler);
                // this.audioController.on('canPlayThrough', this.canplayHandler);
                // this.audioController.on('canPlayThrough', this.updateBuffered);
                this.audioController.on('ended', this.endedHandler);
                this.audioController.on('timeUpdate', this.timeupdateHandler);
                this.audioController.on('loadedMetadata', this.loadedmetadataHandler);
                // this.audioController.on('loadeddata', this.loadeddataHandler);
                this.audioController.on('progress', this.updateBuffered);
                this.audioController.on('waiting', this.waitingHandler);
                
                this.isMounded = true;

                this.initLocalStorage();
                this.initCSScheck();
            },
            methods: {
                initLocalStorage() {
                    const resetStorage = () => {
                        this.localStorage.content = {
                            version: this.localStorage.version,
                            volume: {
                                value: this.volume.default,
                                muted: false,
                            },
                            history: [],
                        }
                        window.localStorage.setItem(this.localStorage.prefix, JSON.stringify(this.localStorage.content));
                    };
                    this.localStorage.content = JSON.parse(window.localStorage.getItem(this.localStorage.prefix));
                    if (this.localStorage.content === null) {
                        resetStorage();
                    } else {
                        const storedVersion = this.localStorage.content.version;
                        const storedVolume = this.localStorage.content.volume;
                        const storedHistory = this.localStorage.content.history;
                        if (storedVersion === undefined || storedVersion === null || storedVersion !== this.localStorage.version) {
                            console.warn(`LocalStorage data is outdated (${storedVersion} vs ${this.localStorage.version}) and will be reset.`)
                            resetStorage();
                        }
                        if (storedVolume !== undefined && storedVolume !== null) {
                            this.volume.default = storedVolume.value !== undefined ? storedVolume.value : this.volume.default;
                            this.volume.value = this.volume.default;
                            this.$nextTick(() => {
                                this.volume.muted = storedVolume.muted !== undefined ? storedVolume.muted : false;
                            });
                        }
                        if (storedHistory !== undefined && storedHistory !== null && storedHistory.length > 0) {
                            console.log('There are tracks stored');
                        }
                    }
                },
                updateLocalStorage() {
                    window.localStorage.setItem(this.localStorage.prefix, JSON.stringify(this.localStorage.content));
                },
                initCSScheck() {
                    if (!this.isCSSloaded) {
                        window.addEventListener('load', () => {
                            this.isCSSloaded = true;
                        });
                        const siid = setInterval(() => {
                            if (document.styleSheets.length > 0) {
                                this.isCSSloaded = true;
                                clearInterval(siid);
                            }
                        }, 333);
                    }
                },
                load() {
                    store.commit('playback', 'loading');
                },
                play() {
                    store.commit('playback', 'playing');
                },
                playPrevious() {
                    console.warn('playPrevious attempt');
                    // store.commit('playback', 'playing');
                },
                playNext() {
                    console.warn('playNext attempt');
                    // store.commit('playback', 'playing');
                },
                pause() {
                    store.commit('playback', 'paused');
                },
                endedHandler() {
                    this.pause();
                },
                timeupdateHandler() {
                    if (!this.seeking) {
                        this.timing.current = this.audioController.media.currentTime;
                    }
                },
                canplayHandler() {
                    this.updateBuffered();
                    if (!this.isPaused) {
                        this.play();
                    } else {
                        this.pause();
                    }
                },
                loadedmetadataHandler() {
                    this.timing.current = 0;
                    this.timing.total = this.audioController.media.duration;
                    this.audioController.play();
                },
                // loadeddataHandler() {
                // },
                waitingHandler() {
                    this.load();
                },
                updateBuffered() {
                    this.buffered = this.audioController.buffered;
                },
                toggleVolume() {
                    this.volume.muted = !this.volume.muted;
                },
                barMousedownHandler(e) {
                    this.seeking = true;
                    this.updateCurrent(e);
                    document.addEventListener('mousemove', this.updateCurrent);
                    document.addEventListener('mouseup', this.barMouseupHandler);
                },
                updateCurrent(e) {
                    this.timing.current = Math.max(Math.min(e.clientX - this.$refs.bar.offsetLeft, this.$refs.bar.clientWidth), 0) / this.$refs.bar.clientWidth * this.timing.total;
                },
                barMouseupHandler() {
                    this.seeking = false;
                    this.audioController.current = this.timing.current;
                    document.removeEventListener('mousemove', this.updateCurrent);
                    document.removeEventListener('mouseup', this.barMouseupHandler);
                },
                barTouchstartHandler(e) {
                    this.seeking = true;
                    this.updateCurrentTouch(e);
                    document.addEventListener('touchmove', this.updateCurrentTouch);
                    document.addEventListener('touchend', this.barTouchendHandler);
                },
                updateCurrentTouch(e) {
                    const touch = e.touches[e.touches.length -1];
                    this.timing.current = Math.max(Math.min(touch.clientX - this.$refs.bar.offsetLeft, this.$refs.bar.clientWidth), 0) / this.$refs.bar.clientWidth * this.timing.total;
                },
                barTouchendHandler() {
                    this.seeking = false;
                    this.audioController.current = this.timing.current;
                    document.removeEventListener('touchmove', this.updateCurrentTouch);
                    document.removeEventListener('touchend', this.barTouchendHandler);
                },

                barMousedownHandler_MOBILE(e) {
                    this.seeking = true;
                    this.updateCurrent_MOBILE(e);
                    document.addEventListener('mousemove', this.updateCurrent_MOBILE);
                    document.addEventListener('mouseup', this.barMouseupHandler_MOBILE);
                },
                updateCurrent_MOBILE(e) {
                    this.timing.current = Math.max(Math.min(e.clientX - this.$refs.barMobile.offsetLeft, this.$refs.barMobile.clientWidth), 0) / this.$refs.barMobile.clientWidth * this.timing.total;
                },
                barMouseupHandler_MOBILE() {
                    this.seeking = false;
                    this.audioController.current = this.timing.current;
                    document.removeEventListener('mousemove', this.updateCurrent_MOBILE);
                    document.removeEventListener('mouseup', this.barMouseupHandler_MOBILE);
                },
                barTouchstartHandler_MOBILE(e) {
                    this.seeking = true;
                    this.updateCurrentTouch_MOBILE(e);
                    document.addEventListener('touchmove', this.updateCurrentTouch_MOBILE);
                    document.addEventListener('touchend', this.barTouchendHandler_MOBILE);
                },
                updateCurrentTouch_MOBILE(e) {
                    const touch = e.touches[e.touches.length -1];
                    this.timing.current = Math.max(Math.min(touch.clientX - this.$refs.barMobile.offsetLeft, this.$refs.barMobile.clientWidth), 0) / this.$refs.barMobile.clientWidth * this.timing.total;
                },
                barTouchendHandler_MOBILE() {
                    this.seeking = false;
                    this.audioController.current = this.timing.current;
                    document.removeEventListener('touchmove', this.updateCurrentTouch_MOBILE);
                    document.removeEventListener('touchend', this.barTouchendHandler_MOBILE);
                },

                volumeMousedownHandler(e) {
                    this.updateVolume(e);
                    document.addEventListener('mousemove', this.updateVolume);
                    document.addEventListener('mouseup', this.volumeMouseupHandler);
                },
                updateVolume(e) {
                    this.volume.value = Math.max(Math.min(e.clientX - this.$refs.volumeBar.offsetLeft, this.$refs.volumeBar.clientWidth), 0) / this.$refs.volumeBar.clientWidth;
                },
                volumeMouseupHandler() {
                    document.removeEventListener('mousemove', this.updateVolume);
                    document.removeEventListener('mouseup', this.volumeMouseupHandler);
                },

                volumeTouchstartHandler(e) {
                    this.updateVolumeTouch(e);
                    document.addEventListener('touchmove', this.updateVolumeTouch);
                    document.addEventListener('touchend', this.volumeTouchendHandler);
                },
                updateVolumeTouch(e) {
                    const touch = e.touches[e.touches.length -1];
                    this.volume.value = Math.max(Math.min(touch.clientX - this.$refs.volumeBar.offsetLeft, this.$refs.volumeBar.clientWidth), 0) / this.$refs.volumeBar.clientWidth;
                },
                volumeTouchendHandler() {
                    document.removeEventListener('touchmove', this.updateVolumeTouch);
                    document.removeEventListener('touchend', this.volumeTouchendHandler);
                },

                volumeMousedownHandler_MOBILE(e) {
                    this.updateVolume_MOBILE(e);
                    document.addEventListener('mousemove', this.updateVolume_MOBILE);
                    document.addEventListener('mouseup', this.volumeMouseupHandler_MOBILE);
                },
                updateVolume_MOBILE(e) {
                    this.volume.value = Math.max(Math.min(e.clientX - this.$refs.volumeBarMobile.offsetLeft, this.$refs.volumeBarMobile.clientWidth), 0) / this.$refs.volumeBarMobile.clientWidth;
                },
                volumeMouseupHandler_MOBILE() {
                    document.removeEventListener('mousemove', this.updateVolume_MOBILE);
                    document.removeEventListener('mouseup', this.volumeMouseupHandler_MOBILE);
                },

                volumeTouchstartHandler_MOBILE(e) {
                    this.updateVolumeTouch_MOBILE(e);
                    document.addEventListener('touchmove', this.updateVolumeTouch_MOBILE);
                    document.addEventListener('touchend', this.volumeTouchendHandler_MOBILE);
                },
                updateVolumeTouch_MOBILE(e) {
                    const touch = e.touches[e.touches.length -1];
                    this.volume.value = Math.max(Math.min(touch.clientX - this.$refs.volumeBarMobile.offsetLeft, this.$refs.volumeBarMobile.clientWidth), 0) / this.$refs.volumeBarMobile.clientWidth;
                },
                volumeTouchendHandler_MOBILE() {
                    document.removeEventListener('touchmove', this.updateVolumeTouch_MOBILE);
                    document.removeEventListener('touchend', this.volumeTouchendHandler_MOBILE);
                },
                activateStream(stream) {
                    if (this[stream].isOnline) {
                        store.commit('track', this[stream].track);
                    }
                },
                extend() {
                    this.isExtended = true;
                },
                collapse() {
                    this.isExtended = false;
                },
                formatTime(time) {
                    const formatNumber = (n) => {
                        return n < 10 ? '0' + n.toString() : n;
                    }
                    const minutes = Math.floor(time / 60);
                    const seconds = Math.round(time % 60);
                    return `${minutes}:${formatNumber(seconds)}`;
                }
            },
            computed: {
                isIOS() {
                    return isIOS();
                },
                live() {
                    return store.state.live;
                },
                radio() {
                    return store.state.radio;
                },
                track() {
                    return store.state.track;
                },
                isStream() {
                    return store.getters.isStream;
                },
                isLive() {
                    return this.mode === 'live';
                },
                isRadio() {
                    return this.mode === 'radio';
                },
                isTrack() {
                    return this.mode === 'track';
                },
                playback() {
                    return store.getters.playback;
                },
                isPaused() {
                    return store.getters.isPaused;
                },
                isPlaying() {
                    return store.getters.isPlaying;
                },
                isLoading() {
                    return store.getters.isLoading;
                },
                formattedTime() {
                    if (this.timing.current === null || this.timing.total === null) {
                        return '';
                    }
                    return `${this.formatTime(this.timing.current)} / ${this.formatTime(this.timing.total)}`;
                },
                playedPart() {
                    if (this.timing.current !== null && this.timing.total !== null) {
                        return this.timing.current / this.timing.total;
                    } else {
                        return 0;
                    }
                },
                playedPixels() {
                    if (this.isMounded && this.isCSSloaded) {
                        return (this.playedPart * this.$refs.bar.clientWidth).toFixed(2);
                    } else {
                        return 0;
                    }
                },
                bufferedGradient() {
                    const transparent = 'rgba(0,0,0,0)';
                    if (this.buffered && !this.isStream) {
                        if (this.isMounded && this.bufferBGcolor === null) {
                            this.bufferBGcolor = window.getComputedStyle(this.$refs.buffered).backgroundColor;
                            this.$refs.buffered.style.backgroundColor = transparent;
                        }
                        const fullWidth = this.$refs.bar.clientWidth;
                        let coloredBuffer = [];
                        for (let i = 0; i < this.buffered.length; i++) {
                            const startX = this.buffered[i][0] / this.timing.total * fullWidth;
                            const endX = this.buffered[i][1] / this.timing.total * fullWidth;
                            const before = `${transparent} ${startX}px`;
                            const start = `${this.bufferBGcolor} ${startX}px`;
                            const end = `${this.bufferBGcolor} ${endX}px`;
                            const after = `${transparent} ${endX}px`;
                            coloredBuffer.push(before, start, end, after);
                        }
                        return coloredBuffer.join(', ');
                    } else {
                        return '${transparent} 0%, ${transparent} 100%';
                    }
                },
                volumePixels() {
                    if (!this.volume.muted) {
                        return '0';
                    }
                    if (this.isMounded && this.isCSSloaded) {
                        return (this.volume.value * this.$refs.volumeBar.clientWidth).toFixed(2);
                    } else {
                        return 0;
                    }
                }
            },
            watch: {
                radio() {
                    if (this.isRadio) {
                        store.commit('track', this.radio.track);
                    }
                },
                live() {
                    if (this.isLive) {
                        if (this.live.isOnline) {
                            store.commit('track', this.live.track);
                        } else {
                            // store.commit('deactivate');
                            this.pause();
                            this.isTouched = false;
                            // this.activateStream('radio');
                            // this.pause();
                        }
                    }
                },
                track(current, prev) {
                    if (!this.isTouched) {
                        this.isTouched = true;
                    }
                    this.timing.total = null;
                    if (this.track !== null && this.track.id === this.radio.track.id) {
                        this.mode = 'radio';
                    } else if (this.track !== null && this.track.id === this.live.track.id) {
                        this.mode = 'live';
                    } else {
                        this.mode = 'track';
                    }
                    // if (current !== null && (prev === null || (prev !== null && current.source !== prev.source))) {
                    if (current !== null && (prev === null || (prev !== null && current.id !== prev.id))) {
                        this.load();
                        this.audioController.source = this.track.source;
                    }
                },
                playback() {
                    if (this.isPlaying) {
                        this.audioController.play();
                    }
                    if (this.isPaused) {
                        if (this.isStream) {
                            this.audioController.stop();
                        } else {
                            this.audioController.pause();
                        }
                    }
                },
                'volume.value'() {
                    this.volume.muted = parseFloat(this.volume.value) <= 0;
                    this.audioController.volume = this.volume.value;
                    this.localStorage.content.volume.value = this.volume.value;
                    this.updateLocalStorage();
                },
                'volume.muted'() {
                    if (parseFloat(this.volume.value) <= 0 && !this.volume.muted) {
                        this.volume.value = this.volume.default;
                    }
                    this.audioController.muted = this.volume.muted;
                    this.localStorage.content.volume.muted = this.volume.muted;
                    this.updateLocalStorage();
                },
                'timing.current'(current) {
                    if (Math.abs(current - this.audioController.current) >= 0.5 && !this.seeking) {
                        this.audioController.current = current;
                    }
                },
            },
        });
    }
}