<template>
    <div class="ui-loader"
        v-bind:class="{
            _gray: variant === 'gray',
            _accent: variant === 'accent',
        }"
        >
    </div>
</template>

<script>
export default {
    name: 'ui-loader',
    props: {
        variant: {
            type: String,
            default: null,
        },
    },
};
</script>

<style scoped lang="less">
@import '~theme';

.ui-loader {
    position: relative;

    display: block;
    width: 100%;
    padding-bottom: 100%;
    color: @color-gray-lightest;
    &:after {
        content: " ";

        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;

        display: block;
        width: 100%;
        height: 100%;
        border: 5px solid currentColor;
        border-color: currentColor transparent currentColor transparent;

        border-radius: 50%;

        animation: loader 1.2s linear infinite;
    }
    &._gray {
        color: @color-gray-light;
    }
    &._accent {
        color: @color-primary-main;
    }
}
@keyframes loader {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
