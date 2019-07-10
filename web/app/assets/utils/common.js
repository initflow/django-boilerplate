import config, { translations } from '../config';

export const getColorLuma = (colorString) => {
    let rgb = parseInt(colorString, 16); // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff; // extract red
    let g = (rgb >>  8) & 0xff; // extract green
    let b = (rgb >>  0) & 0xff; // extract blue
    let luma = r * 0.2126 + g * 0.7152 + b * 0.0722; // per ITU-R BT.709 // 0 - 255
    return luma;
};
export const isColorDark = (colorString) => {
    return getColorLuma(colorString) < 120;
};
export const isColorLight = (colorString) => {
    return getColorLuma(colorString) > 200;
};

export const getCurrentLanguage = () => {
    let result = 'ru';
    try {
        const path = window.location.pathname;
        for (const language in translations) {
            if (translations.hasOwnProperty(language) && path.indexOf(`/${language}/`) != -1) {
                result = language;
                break;
            }
        }
    } catch (error) {
        console.error('getCurrentLanguage error');
        console.error(error);
    }
    return result;
};

export const isIOS = () => {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

export const isIE = () => {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    // if (msie > -1) {
    //     // IE 10 or older => return version number
    //     return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    // }

    var trident = ua.indexOf('Trident/');
    // if (trident > -1) {
    //     // IE 11 => return version number
    //     var rv = ua.indexOf('rv:');
    //     return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    // }

    var edge = ua.indexOf('Edge/');
    // if (edge > -1) {
    //     // Edge (IE 12+) => return version number
    //     return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    // }

    if (msie > -1 || trident > -1 || edge > -1) {
        return true;
    }
    // other browser
    return false;
}

export class Listening {
    _eventHandlers = {}

    on(event, handler) {
        if (!(event in this._eventHandlers)) {
            this._eventHandlers[event] = [];
        }

        this._eventHandlers[event].push(handler);
    }

    off(event, handler) {
        if (!(event in this._eventHandlers)) {
            return;
        }

        this._eventHandlers[event] = this._eventHandlers[event].filter(x => x !== handler);
    }

    trigger(event, data) {
        if (!(event in this._eventHandlers)) {
            return;
        }
        this._eventHandlers[event].forEach(handler => handler(data));
    }
}