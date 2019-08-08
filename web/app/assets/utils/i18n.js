import { languages } from '../config';

export const getCurrentLanguage = () => {
    let result = {
        code: 'ru',
        title: 'Russian'
    };
    try {
        const path = window.location.pathname;
        for (const language in languages) {
            if (path.indexOf(`/${language.code}/`) !== -1) {
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

export default {
    getCurrentLanguage,
}