/* eslint-disable new-cap */
import Vue from 'vue';
import store from './store';
import utils from './utils';
import SvgIcon from 'vue-svgicon';
import './components/icons';

utils.dom.bindLoadListener();

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['cms-template', 'cms-plugin'];
Vue.use(SvgIcon, {
    tagName: 'icon',
    defaultWidth: '1em',
    defaultHeight: '1em',
});

// Глобальная регистрация vue-компонентов
const requireComponent = require.context(
    // Относительный путь до каталога компонентов
    './',
    // Обрабатывать или нет подкаталоги
    true,
    // Сейчас регистрируются все .vue файлы
    // Можно использовать другие регулярки, чтобы отобрать только базовые компоненты, например ui
    // /Base[A-Z]\w+\.(vue|js)$/
    /\.(vue)$/
);

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);

    if (!componentConfig.default) {
        console.warn('Missing Vue component default export:', componentConfig);
        console.warn('Warning above relates to file ' + fileName);
        return;
    }
    if (!componentConfig.default.name) {
        console.warn('Missing Vue component name:', componentConfig);
        console.warn('Warning above relates to file ' + fileName);
        return;
    }

    Vue.component(
        componentConfig.default.name,
        componentConfig.default,
    );
});

const rootElement = document.getElementById('app');
// eslint-disable-next-line no-new
new Vue({
    el: rootElement,
    store,
    created() {
        if (rootElement.getAttribute('is-admin')) {
            // eslint-disable-next-line no-new
            new utils.common.updateDjangoTamplateTags(this);
        } else {
            utils.common.updateDjangoScriptTags();
        }
    },
});
