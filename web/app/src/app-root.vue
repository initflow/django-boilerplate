<template>
    <div>
        app-root
    </div>
</template>

<script>
export default {
    name: 'app-root',
    data: () => ({
        scrollToSave: 0,
    }),
    computed: {
        isBodyFixed() {
            return this.$store.getters['common/isBodyFixed'];
        },
    },
    mounted() {
        document.querySelector('#content-placeholder').classList.add('_disabled');
        this.$store.dispatch('callbacks/execute');
    },
    watch: {
        isBodyFixed(newValue) {
            const body = document.body;
            const fixedClass = '_fixed';
            if (newValue) {
                this.scrollToSave = window.pageYOffset;
                body.classList.add(fixedClass);
                body.style.top = `${-this.scrollToSave}px`;
            } else {
                body.classList.remove(fixedClass);
                window.scrollTo(0, this.scrollToSave);
                body.style.top = 0;
                this.scrollToSave = 0;
            }
        },
    },
};
</script>

<style lang="less">
@import '../node_modules/normalize.css/normalize.css';
@import '../node_modules/swiper/css/swiper.min.css';
@import '~theme';

*,
*:before,
*:after {
    box-sizing: border-box;
}

[v-cloak] {
    display: none !important;
}

html {
    color: @color-text-main;
    font-family: 'Open Sans', sans-serif;
    font-size: 10px;
    line-height: 1;

    &.cms-toolbar-expanded {
        padding-top: 46px !important;
        margin-top: 0 !important;
    }
}
body {
    position: static;
    margin: 0;

    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    scroll-behavior: smooth;
    &._fixed {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        .cms-toolbar-expanded & {
            padding-top: 46px;
        }
    }
}
.app-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
}
.content-placeholder._disabled {
    pointer-events: none;
    animation: placeholder-remove 0.5s linear forwards;
    @keyframes placeholder-remove {
        0% {
            opacity: 1;
        }
        99% {
            opacity: 0;
        }
        100% {
            opacity: 0;
            visibility: hidden;
        }
    }
}
a {
    cursor: pointer;
    color: inherit;
}
img {
    display: block;
    max-width: 100%;
}
input, textarea {
    display: block;
    max-width: 100%;
    border: none;
    padding: 0;
    margin: 0;
    background: transparent;
    outline: none;
    box-shadow: none;
    appearance: none;
    &::placeholder {
        color: inherit;
    }
}
button {
    display: block;
    max-width: 100%;
    border: none;
    padding: 0;
    margin: 0;

    color: inherit;

    background: transparent;

    outline: none;
    box-shadow: none;
    appearance: none;
    cursor: pointer;
}
.svg-icon {
    display: block;
    width: 16px;
    height: 16px;

    color: inherit;

    fill: none;
    stroke: currentColor;
}
.svg-fill {
    fill: currentColor;
    stroke: none;
}
</style>
