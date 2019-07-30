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

export default {
    isIOS,
    isIE,
}