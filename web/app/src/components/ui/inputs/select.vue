<template>
    <ui-input-base-select
        v-bind:is-invalid="isInvalid"
        v-bind="model"
        v-on:change="changeHandler"
    />
</template>

<script>
export default {
    name: 'ui-input-select',
    props: {
        model: {
            type: Object,
        },
        isInvalid: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
        },
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    methods: {
        changeHandler(newValue) {
            this.$emit('change', newValue);
        },
    },
};
</script>

<style scoped lang="less">
@import "~theme";

.ui-input-select {
    width: 100%;
}
</style>
