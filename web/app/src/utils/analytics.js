export const googleAnalytics = (options = {}) => {
    options = {
        method: 'send',
        type: 'event',
        status: 'success',
        name: '',
        ...options,
    };
    try {
        window.ga(options.method, options.type, options.name, options.status);
    } catch (error) {
        console.warn(error);
        console.warn(`triggered by: ga('${options.method}', '${options.type}', '${options.name}', '${options.status}');`);
    }
};

export const yandexMetrika = (options = {}) => {
    options = {
        key: 39370580,
        method: 'reachGoal',
        target: '',
        ...options,
    };
    try {
        if (options.params !== undefined) {
            window.ym(options.key, options.method, options.target, options.params);
        } else {
            window.ym(options.key, options.method, options.target);
        }
    } catch (error) {
        console.warn(error);
        console.warn(`triggered by: window.ym(${options.key}, ${options.method}, ${options.target}, ${options.params});`);
    }
};

export default {
    googleAnalytics,
    yandexMetrika,
};
