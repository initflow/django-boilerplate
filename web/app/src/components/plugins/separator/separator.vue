<template>
    <div>
        plugin-separator
    </div>
</template>

<script>
export default {
    name: 'plugin-separator',
};
</script>

<style scoped lang="less">
@import '~theme';

.plugin-separator {
    width: 100%;
    height: 1px;

    background-color: @color-background-support;
}
</style>
