<template>
    <label class="ui-input-base-checkbox"
        v-bind:class="{
            _active: value,
            _focused: isFocused,
        }"
        >
        <input class="ui-input-base-checkbox__input"
            type="checkbox"
            v-bind:checked="value"
            v-bind:autofocus="isAutofocus"
            v-on:focus="focusHandler"
            v-on:blur="blurHandler"
            v-on:change="updateModel($event.target.checked)"
        />
        <div class="ui-input-base-checkbox__check">
            <icon name="check" />
        </div>
    </label>
</template>

<script>
export default {
    name: 'ui-input-base-checkbox',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isAutofocus: {
            type: Boolean,
            default: false,
        },
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    data: () => ({
        isFocused: false,
    }),
    methods: {
        updateModel(newValue) {
            this.$emit('change', newValue);
        },
        focusHandler() {
            this.isFocused = true;
        },
        blurHandler() {
            this.isFocused = false;
        },
    },
};
</script>

<style scoped lang="less">
@import "~theme";

.ui-input-base-checkbox {
    position: relative;

    display: block;
    width: 16px;
    height: 16px;

    cursor: pointer;
    box-shadow: 0 0 0 0 @color-gray-dark, inset 0 0 0 8px @color-gray-lightest;

    background-color: @color-gray-darkest;

    transition: box-shadow @duration-fast @easing-default;
    &._active {
        box-shadow: 0 0 0 0 @color-gray-dark, inset 0 0 0 0 @color-gray-lightest;
    }
    &._focused {
        box-shadow: 0 0 0 2px @color-gray-dark, inset 0 0 0 8px @color-gray-lightest;
    }
    &._focused._active {
        box-shadow: 0 0 0 2px @color-gray-dark, inset 0 0 0 0 @color-gray-lightest;
    }
    &__input {
        position: absolute;
        top: 0;
        left: 0;

        opacity: 0;
        appearance: none;
    }
    &__check {
        position: absolute;
        top: 0;
        left: 0;

        color: @color-gray-lightest;
        font-size: 1.6rem;

        transform: scale(0.1);

        transition: transform @duration-fast 0.2s @easing-out-elastic;
        ._active > & {
            transform: scale(1);
        }
    }
}
</style>
