<template>
    <ui-input-base-text
        v-bind:is-invalid="isInvalid"
        v-bind="model"
        v-on:input="inputHandler"
    />
</template>

<script>
export default {
    name: 'ui-input-email',
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
        event: 'input',
    },
    methods: {
        inputHandler(newValue) {
            this.$emit('input', newValue);
        },
    },
};
</script>

<style scoped lang="less">
@import "~theme";
</style>
