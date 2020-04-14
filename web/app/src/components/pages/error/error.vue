<template>
    <div>
        page-error
    </div>
</template>

<script>
export default {
    name: 'page-error',
};
</script>

<style lang="less">
@import '~theme';

.page-error {
    margin: auto 0;

    &__title {
        .container;
        .container-paddings;

        position: relative;
        z-index: 1;

        color: @color-primary-main;
        font-size: 3rem;
        font-weight: 900;
        line-height: 0.74em;
        letter-spacing: -0.1em;
        text-transform: uppercase;
    }
    &__code {
        width: 100%;
        padding-bottom: 0.05em;

        color: @color-gray-lightest;
        font-size: 15rem;
        font-weight: 900;
        line-height: 0.65em;
        letter-spacing: -0.11em;
        text-align: center;

        background: @color-primary-main;
    }
    @media @media-md-down {
        padding: 100px 0;
    }
}
</style>
