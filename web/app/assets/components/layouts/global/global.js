import moment from 'moment';
import { mainClient } from '../../../network';
import store from '../../../utils/vueStorage';
import { getCurrentLanguage } from '../../../utils/common';
import config from '../../../config';
import app from '../../../app';

export default class LayoutGlobal {
    static code = 'l-global';
    static dataCode = `data-${this.code}`;
    static selector = `[${this.dataCode}]`;

    options = {
        animationEnabledClassName: '_animation-enabled',
        scrollDisabledClassName: '_scroll-disabled',
    };
    root = null;
    scroll = 0;
    localStoragePrefix = `${config.localStorage.keyPrefix}GlobalSettings`;
    elements = {
        notification: null,
        notificationClose: null,
    };

    constructor(element) {
        this.dataCode = this.constructor.dataCode;
        this.root = element;
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.root.classList.add(this.options.animationEnabledClassName);
            }, 100);
        });

        moment.locale(getCurrentLanguage());

        app.initInstanceElements(this);
        this.initStreamsChecking();
        this.checkCookieAgreement();
    }

    fixBody() {
        this.scroll = window.pageYOffset;
        this.root.classList.add(this.options.scrollDisabledClassName);
        this.root.style.top = '-' + this.scroll + 'px';
    }

    unfixBody() {
        this.root.classList.remove(this.options.scrollDisabledClassName);
        window.scrollTo(0, this.scroll);
        this.root.style.top = 0;
    }

    initStreamsChecking() {
        const source = 'radio.co';
        const checkLive = async () => {
            const { data = data, error, status } = await mainClient.events.getLiveEvents();

            if (error !== null) {
                console.warn(`getLives failure: ${status}`);
                console.warn(error);
            } else {
                const live = {
                    isOnline: false,
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
                };
                if (data.items.length > 0) {
                    const item = data.items[0];
                    const liveAudioConfig = config.sources[source].live;
                    live.event = {
                        id: item.pk,
                        name: item.name,
                        description: item.short_description,
                        image: item.promo_image,
                        url: `/event/${item.slug}/`,
                    };
                    item.media_set.forEach(media => {
                        if (config.mediaTypes.live.audio.indexOf(media.type.name) > -1) {
                            live.isOnline = true;
                            live.track = {
                                id: 'live',
                                source: `${config.sources[source].baseUrl}${liveAudioConfig.source.urlPrefix}${liveAudioConfig.id}${liveAudioConfig.source.urlAffix}`,
                                type: 'stream',
                                name: item.name,
                                author: null,
                                image: item.promo_image,
                                playback: store.getters.playback,
                            };
                        }
                        if (config.mediaTypes.live.video.indexOf(media.type.name) > -1) {
                            live.isOnline = true;
                            live.video = {
                                id: 'live',
                                source: media.url,
                                type: media.type.name,
                            };
                        }
                    });
                }
                const storedLive = store.state.live;
                if (storedLive.isOnline !== live.isOnline || storedLive.event.name !== live.event.name) {
                    store.commit('live', live);
                }
            }
        }

        const checkRadio = async () => {
            const { data, error, status } = await mainClient.radio.checkStatus({ source: source });

            if (error !== null) {
                console.warn(`Radio status check failure: ${status}`);
                console.warn(error);
            } else {
                const storedRadio = store.state.radio;
                if (storedRadio.isOnline !== data.isOnline || storedRadio.track.id !== data.currentTrackTitle) {
                    const radioConfig = config.sources[source].radio;
                    
                    store.commit('radio', {
                        isOnline: data.isOnline,
                        track: {
                            id: 'radio',
                            source: `${config.sources[source].baseUrl}${radioConfig.source.urlPrefix}${radioConfig.id}${radioConfig.source.urlAffix}`,
                            author: data.currentTrackTitle ? data.currentTrackTitle.split(' - ')[0] : '',
                            name: data.currentTrackTitle ? data.currentTrackTitle.split(' - ')[1] : '',
                            type: 'stream',
                            image: data.image,
                            playback: store.getters.playback,
                        }
                    });
                }
            }
        }

        checkLive();
        checkRadio();

        const siidLive = setInterval(() => {
            checkLive();
        }, 20000);
        const siidRadio = setInterval(() => {
            checkRadio();
        }, 2500);
    }

    checkCookieAgreement() {
        const storedGlobalSettings = JSON.parse(window.localStorage.getItem(this.localStoragePrefix));
        if (storedGlobalSettings !== null && storedGlobalSettings.areCookiesAccepted !== undefined && storedGlobalSettings.areCookiesAccepted !== null) {
            if (!storedGlobalSettings.areCookiesAccepted) {
                this.showCookieNotification();
            }
        } else {
            this.initGlobalSettings();
            this.updateGlobalSettings({
                areCookiesAccepted: false,
            });
            this.showCookieNotification();
        }
    }

    initGlobalSettings() {
        window.localStorage.setItem(this.localStoragePrefix, JSON.stringify({}));
    }

    updateGlobalSettings(newSettings) {
        const oldSettings = JSON.parse(window.localStorage.getItem(this.localStoragePrefix));
        window.localStorage.setItem(this.localStoragePrefix, JSON.stringify({
            ...oldSettings,
            ...newSettings,
        }));
    }

    showCookieNotification() {
        const notification = this.elements.notification;
        const close = this.elements.notificationClose;
        const closeHandler = () => {
            this.updateGlobalSettings({
                areCookiesAccepted: true,
            });
            notification.classList.remove('_active');
            close.removeEventListener('click', closeHandler);
        }

        if (!notification || !close) {
            return;
        }

        notification.classList.add('_active');
        close.addEventListener('click', closeHandler);
    }
}