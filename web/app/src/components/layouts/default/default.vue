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

<style scoped lang="less">
@import '~theme';

.layout-default {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    &__main {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }
}
</style>
