import Vue from 'vue';

// Utils
import './utils/polyfills';

// Components
// UI

// Common
import commonHeader from './components/common/header';
import commonCounter from './components/common/counter';

// Plugins

// Screens

// Layouts
import layoutGlobal from './components/layouts/global';

// App
import app from './app';

window.addEventListener('load', () => {
    console.log(app.$el);
    // everything is loaded
});