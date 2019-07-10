
// Utils
import '@babel/polyfill';
import './utils/polyfills';

// App
import app from './app';

// Layouts
import LayoutGlobal from './components/layouts/global/global';

// Screens
import ScreenEventsItem from './components/screens/events-item/events-item';

// Plugins
import PluginAboutFeatures from './components/plugins/about/features/features';
import PluginAboutHeadline from './components/plugins/about/headline/headline';
import PluginEventsList from './components/plugins/events/list/list';
import PluginDecorationDisk from './components/plugins/decoration/disk/disk';
import PluginDecorationBird from './components/plugins/decoration/bird/bird';

// Common
import CommonClassToggler from './components/common/classToggler/classToggler';
import CommonHeader from './components/common/header/header';
import CommonFooter from './components/common/footer/footer';
import CommonModalOpener from './components/common/modal/modalOpener';
import CommonModal from './components/common/modal/modal';
import CommonNavigation from './components/common/navigation/navigation';
import CommonPlayer from './components/common/player/player';
import CommonTicker from './components/common/ticker/ticker';
import CommonTrack from './components/common/track/track';

app.setComponents([
    LayoutGlobal,

    ScreenEventsItem,

    PluginAboutHeadline,
    PluginEventsList,
    PluginAboutFeatures,
    PluginDecorationDisk,
    PluginDecorationBird,

    CommonClassToggler,
    CommonHeader,
    CommonFooter,
    CommonModalOpener,
    CommonModal,
    CommonNavigation,
    CommonPlayer,
    CommonTicker,
    CommonTrack,
]);

document.addEventListener('DOMContentLoaded', () => {
    app.initializeComponents();
});