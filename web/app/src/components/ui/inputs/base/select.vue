<template>
    <div class="ui-input-base-select"
        v-bind:class="{
            _focused: isFocused,
            _invalid: isInvalid,
        }"
        >
        <div class="ui-input-base-select__arrow">
        </div>
        <select class="ui-input-base-select__select"
            v-on:focus="focusHandler"
            v-on:blur="blurHandler"
            v-on:change="changeHandler"
            v-bind:autofocus="isAutofocus"
            v-bind:value="value"
            ref="input"
            >
            <option class="ui-input-base-select__select-option"
                v-if="placeholder"
                disabled
                v-bind:selected="!value"
                v-text="placeholder"
                value=""
            />
            <option class="ui-input-base-select__select-option"
                v-for="(option, i) in optionsMapped"
                v-bind:key="i"
                v-bind:value="option.value"
                v-text="option.title"
            />
        </select>
    </div>
</template>

<script>
export default {
    name: 'ui-input-base-select',
    props: {
        value: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: 'select',
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
        onChange: {
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
        errors: {
            type: Object,
            default: null,
        },
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    data: () => ({
        isFocused: false,
    }),
    computed: {
        optionsMapped() {
            return this.options.map(x => {
                if (typeof x === 'string' || typeof x === 'number') {
                    return { title: x.toString(), value: x };
                } else {
                    return x;
                }
            });
        },
    },
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
        changeHandler(e) {
            if (this.onChange !== null) {
                this.onChange(e);
            }
            this.$emit('change', e.target.value);
        },
    },
    mounted() {
        if (this.isAutofocus) {
            this.$refs.input.focus();
        }
    },
};
</script>

<style scoped lang="less">
@import "~theme";

.ui-input-base-select {
    .typography-body-md();

    position: relative;

    width: 100%;

    cursor: pointer;
    &__arrow {
        position: absolute;
        top: 50%;
        right: 14px;
        z-index: 0;

        border-width: 6px 4px 0px 4px;
        border-color: @color-gray-darkest transparent transparent transparent;
        border-style: solid;
    }
    &__select {
        position: relative;
        z-index: 1;
        display: block;
        border: none;
        padding: 0;
        width: 100%;
        height: 40px;
        padding: 8px 10px 4px;
        border-radius: 0;

        color: @color-gray-darkest;

        background: rgba(0, 0, 0, 0);

        appearance: none;
        user-select: none;
        outline: none;
        cursor: pointer;
        box-shadow: inset 0 0 0 1px @color-gray-darkest, 0 0 0 0 @color-gray-darkest;

        transition: box-shadow @duration-fast @easing-default;
        &::-ms-expand {
            display: none; /* hide the default arrow in ie10 and ie11 */
        }
        &::-ms-value {
            background: rgba(0,0,0,0);
            color: inherit;
        }
        ._focused > & {
            box-shadow: inset 0 0 0 1px @color-gray-darkest, 0 0 0 2px @color-gray-darkest;
        }
        ._invalid > & {
            box-shadow: inset 0 0 0 1px @color-primary-main;
        }
        ._focused._invalid > & {
            box-shadow: inset 0 0 0 1px @color-primary-main, 0 0 0 2px @color-primary-main;
        }
        &-option {
            user-select: none;
            &:disabled {
                color: @color-gray-main;
            }
        }
    }
}
</style>
