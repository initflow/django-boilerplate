import { bodyAttributes } from '../config';

export const bindLoadListener = () => {
    window.addEventListener('load', () => {
        document.body.setAttribute(bodyAttributes.loaded, '');
    });
};

export const isDOMLoaded = () => {
    return document.body.hasAttribute(bodyAttributes.loaded);
};

export default {
    bindLoadListener,
    isDOMLoaded,
}