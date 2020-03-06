<template>
    <div>
        plugin-common-separator
    </div>
</template>

<script>
export default {
    name: 'plugin-common-separator',
};
</script>

<style scoped lang="less">
@import '~theme';

.plugin-common-separator {
    width: 100%;
    height: 1px;

    background-color: @color-gray-light;
}
</style>
