// import { mainClient } from '../../../network';
import Vue from 'vue';
import store from '../../../utils/vueStorage';
import config from '../../../config';

export default class ScreenEventsItem {
    static singleton = true;
    static code = 's-events-item';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;
    
    root = null;
    elements = {
        back: null,
    };

    isLive = null;
    hasLiveAudio = null;
    hasLiveVideo = null;
    data = null;
    media = null;
    vueAudioComponent = null;
    vueVideoComponent = null;
    
    onEntryElement = (element) => {
        this.root = element;
        this.dataCode = this.constructor.dataCode;
        window.app.initInstanceElements(this);
        this.data = JSON.parse(this.root.getAttribute(`${this.dataCode}-json`));
        this.root.removeAttribute(`${this.dataCode}-json`);
        this.isLive = this.root.getAttribute(`${this.dataCode}-is-live`) === 'True';

        this.initBack();
        this.initMedia();
    }

    initBack() {
        if (window.history.length <= 1 || window.history.state === null) {
            this.elements.back.classList.add('_hidden');
        } else {
            this.elements.back.addEventListener('click', () => {
                window.history.back();
            });
        }
    }

    initMedia() {
        this.media = {
            live: {
                audio: null,
                video: null,
            },
            static: {
                audio: null,
                video: null,
            }
        };
        this.data.media_set.forEach((media, index) => {
            if (config.mediaTypes.live.audio.indexOf(media.type.name) > -1) {
                this.media.live.audio = media;
            }
            if (config.mediaTypes.live.video.indexOf(media.type.name) > -1) {
                this.media.live.video = media;
            }
            if (config.mediaTypes.static.audio.indexOf(media.type.name) > -1) {
                this.media.static.audio = media;
            }
            if (config.mediaTypes.static.video.indexOf(media.type.name) > -1) {
                this.media.static.video = media;
            }
        });

        if (this.isLive && this.media.live.audio !== null) {
            this.hasLiveAudio = true;
        } else {
            this.hasLiveAudio = false;
            this.media.live.audio = null;
        }

        if (this.isLive && this.media.live.video !== null) {
            this.hasLiveVideo = true;
        } else {
            this.hasLiveVideo = false;
            this.media.live.video = null;
        }

        this.initVueAudio();
        this.initVueVideo();
    }
    initVueAudio() {
        const audioLive = this.media.live.audio === null ? null : {
            id: 'live',
            source: this.media.live.audio.type.name === 'radioco_live' ? `${config.sources['radio.co'].baseUrl}${config.sources['radio.co'].live.source.urlPrefix}${config.sources['radio.co'].live.id}${config.sources['radio.co'].live.source.urlAffix}` : this.media.live.audio.url,
            type: 'stream',
            name: this.data.name,
            author: null,
            image: `/resize/100/100${this.data.promo_image}`,
            playback: null,
        };

        const audioStatic = this.media.static.audio === null ? null : {
            id: this.media.static.audio.pk,
            source: this.media.static.audio.url,
            type: 'mp3',
            name: this.data.name,
            author: null,
            image: `/resize/100/100${this.data.promo_image}`,
            playback: null,
        };

        this.vueAudioComponent = new Vue({
            el: this.root.querySelector(`[${this.dataCode}-element="playerAudio"]`),
            delimiters: ['[[', ']]'],
            store,
            data: {
                event: this.data,
                isLive: this.hasLiveAudio,
                
                audioLive: audioLive,
                audioStatic: audioStatic,
            },
            mounted() {
            },
            methods: {
                play() {
                    if (this.isCurrent) {
                        store.commit('playback', 'playing');
                    } else {
                        store.commit('track', this.audio);
                    }
                },
                pause() {
                    store.commit('playback', 'paused');
                },
            },
            computed: {
                live() {
                    return store.state.live;
                },
                track() {
                    return store.getters.track;
                },
                isCurrent() {
                    return this.track !== null && this.audio !== null && this.track.id === this.audio.id;
                },
                isPlaying() {
                    return this.isCurrent && store.state.track.playback === 'playing';
                },
                isPaused() {
                    return this.isCurrent && store.state.track.playback === 'paused';
                },
                isLoading() {
                    return this.isCurrent && store.state.track.playback === 'loading';
                },
                progress() {
                    if (this.audioStatic !== null && this.isCurrent ) {
                        return window.app.getComponentInstanceByName('CommonPlayer').vueComponent.playedPart;
                    }
                    return 0;
                },
                time() {
                    if (this.audioStatic !== null && this.isCurrent ) {
                        return window.app.getComponentInstanceByName('CommonPlayer').vueComponent.formattedTime;
                    }
                    return '';
                },
                audio() {
                    if (this.audioLive !== null && store.state.live.event.id === this.event.pk) {
                        return this.audioLive;
                    } else {
                        return this.audioStatic;
                    }
                }
            },
            watch: {
            },
        });
    }

    initVueVideo() {
        const mediaLive = this.media.live.video === null ? null : {
            source: this.media.live.video.url,
        };

        const mediaStatic = this.media.static.video === null ? null : {
            source: this.media.static.video.url,
        };

        this.vueVideoComponent = new Vue({
            el: this.root.querySelector(`[${this.dataCode}-element="playerVideo"]`),
            delimiters: ['[[', ']]'],
            store,
            data: {
                event: this.data,
                isLive: this.hasLiveVideo,
                
                mediaLive: mediaLive,
                mediaStatic: mediaStatic,

                player: null,
                audioInterrupted: false,
                videoInterrupted: false,
                interruptionTrigger: null,
            },
            mounted() {
                if (this.media === null) {
                    return;
                }
                try {
                    this.init();
                } catch (error) {
                    const script = document.createElement("script");
                    script.src = 'https://player.vimeo.com/api/player.js';
                    script.addEventListener('load', () => {
                        this.init();
                    });
                    
                    document.head.appendChild(script);
                }
            },
            methods: {
                init() {
                    this.player = new Vimeo.Player(this.$refs.iframe);
                    // this.player = new Vimeo.Player(this.$el.querySelector('iframe'));
                    this.player.on('play', this.pauseAudio);
                    this.player.on('pause', this.playAudio);
                },
                pauseAudio() {
                    if (this.isPauseNeeded) {
                        store.commit('playback', 'paused');
                        this.audioInterrupted = true;
                        this.interruptionTrigger = 'video';
                    }
                },
                playAudio() {
                    if (this.audioInterrupted && this.interruptionTrigger === 'video') {
                        store.commit('playback', 'playing');
                        this.interruptionTrigger = null;
                    }
                },
            },
            computed: {
                isPauseNeeded() {
                    return store.getters.track !== null && (store.getters.track.playback === 'playing' || store.getters.track.playback === 'loading');
                },
                playback() {
                    return store.getters.track !== null ? store.getters.track.playback : null;
                },
                media() {
                    if (this.mediaLive !== null && store.state.live.event.id === this.event.pk) {
                        return this.mediaLive;
                    } else {
                        return this.mediaStatic;
                    }
                }
            },
            watch: {
                playback(newPlayback) {
                    if (this.player === null) {
                        return;
                    }
                    const isVideoPaused = this.player.getPaused();
                    isVideoPaused.then(x => {
                        if (newPlayback === 'playing') {
                            if (!x) {
                                this.player.pause();
                                this.videoInterrupted = true;
                                this.interruptionTrigger = 'audio';
                            }
                        } else if (newPlayback !== 'loading') {
                            if (x && this.videoInterrupted && this.interruptionTrigger === 'audio') {
                                this.player.play();
                                this.videoInterrupted = false;
                                this.interruptionTrigger = null;
                            }
                        }
                    }).catch(e => { console.warn(e) });
                },
            },
        });
    }
}