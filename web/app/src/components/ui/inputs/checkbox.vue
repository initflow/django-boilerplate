<template>
    <label class="ui-input-checkbox"
        v-bind:class="{
            _active: checked
        }"
        >
        <input class="ui-input-checkbox__input"
            type="checkbox"
            v-bind:checked="checked"
            v-on:change="updateModel($event.target.checked)"
        />
        <div class="ui-input-checkbox__check" />
    </label>
</template>

<script>
export default {
    name: 'ui-input-checkbox',
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
    },
    model: {
        prop: 'checked',
        event: 'change',
    },
    methods: {
        updateModel(newValue) {
            this.$emit('change', newValue);
        },
    },
};
</script>

<style scoped lang="less">
@import "~theme";

.ui-input-checkbox {
    position: relative;

    display: block;
    width: 15px;
    height: 15px;

    cursor: pointer;
    user-select: none;
    box-shadow: inset 0 0 0 2px @color-background-support;

    transition-property: box-shadow;
    transition-duration: @duration-fast;
    transition-timing-function: ease-in-out;
    &._active {
        box-shadow: inset 0 0 0 2px @color-accent;
    }
    &__input {
        position: absolute;
        top: 0;
        left: 0;

        opacity: 0;
        visibility: hidden;
        appearance: none;
    }
    &__check {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 5px;
        height: 5px;

        background-color: @color-accent;

        opacity: 0;

        transition: opacity @duration-fast ease-in-out;
        ._active & {
            opacity: 1;
        }
    }
}
</style>
