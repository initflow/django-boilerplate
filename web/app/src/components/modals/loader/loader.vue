<template>
    <div class="modal-loader">
        <div class="modal-loader__container">
            <ui-loader v-bind:variant="'gray'" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-loader',
};
</script>

<style scoped lang="less">
@import '~theme';

.modal-loader {
    &__container {
        width: 180px;
        padding: 60px;

        background-color: @color-background;

    }
    @media @media-md-down {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        &__container {
            ._shadowed & {
                box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.5);
            }
        }
    }
}
</style>
