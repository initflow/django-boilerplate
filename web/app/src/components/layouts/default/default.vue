<template>
    <div>
        layout-default
    </div>
</template>

<script>
export default {
    name: 'layout-default',
};
</script>

<style lang="less">
@import '~theme';

.layout-default {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    &__header {
        flex: 0 0 auto;
    }
    &__main {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }
    &__footer {
        flex: 0 0 auto;
    }
}
</style>
