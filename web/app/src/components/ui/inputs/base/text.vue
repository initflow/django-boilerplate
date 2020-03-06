<template>
    <input class="ui-input-base-text"
        v-bind:class="{
            _focused: isFocused,
            _invalid: isInvalid,
        }"
        v-bind:value="value"
        v-bind:type="type"
        v-bind:placeholder="placeholder"
        v-bind:autofocus="isAutofocus"
        v-on:focus="focusHandler"
        v-on:blur="blurHandler"
        v-on:input="inputHandler"
    />
</template>

<script>
export default {
    name: 'ui-input-base-text',
    props: {
        value: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        isAutofocus: {
            type: Boolean,
            default: false,
        },
        isInvalid: {
            type: Boolean,
            default: false,
        },
        onInput: {
            type: Function,
            default: null,
        },
        onFocus: {
            type: Function,
            default: null,
        },
        onBlur: {
            type: Function,
            default: null,
        },
    },
    model: {
        prop: 'value',
        event: 'input',
    },
    data: () => ({
        isFocused: false,
    }),
    methods: {
        focusHandler(e) {
            if (this.onFocus !== null) {
                this.onFocus(e);
            }
            this.isFocused = true;
        },
        blurHandler(e) {
            if (this.onBlur !== null) {
                this.onBlur(e);
            }
            this.isFocused = false;
        },
        inputHandler(e) {
            if (this.onInput !== null) {
                this.onInput(e);
            }
            this.$emit('input', e.target.value);
        },
    },
};
</script>

<style scoped lang="less">
@import "~theme";

.ui-input-base-text {
    .typography-body-md();

    display: block;
    width: 100%;
    padding: 12px;

    background-color: @color-gray-lightest;

    transition: box-shadow @duration-fast @easing-default;
    &._focused {
        box-shadow: inset 0 0 0 1px @color-gray-darkest;
    }
    &._invalid,
    &._focused._invalid {
        box-shadow: inset 0 0 0 1px @color-primary-main;
    }
    &::placeholder {
        color: @color-gray-dark;
    }
}
</style>
