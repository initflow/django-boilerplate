import { bodyAttributes } from '../config';

export const bindLoadListener = () => {
    window.addEventListener('load', () => {
        document.body.setAttribute(bodyAttributes.loaded, '');
    });
};

export const isDocumentLoaded = () => {
    return document.body.hasAttribute(bodyAttributes.loaded);
};

export const addLoadedCallback = (callback = null) => {
    if (callback !== null) {
        if (isDocumentLoaded()) {
            callback();
        } else {
            window.addEventListener('load', callback);
        }
    }
};

export const removeLoadedCallback = (callback = null) => {
    if (callback !== null) {
        window.removeEventListener('load', callback);
    }
};

export default {
    bindLoadListener,
    addLoadedCallback,
    removeLoadedCallback,
    isDocumentLoaded,
};
