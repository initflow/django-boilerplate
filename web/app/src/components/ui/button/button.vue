<template>
    <component class="ui-button"
        v-bind:is="component"
        v-bind:type="type ? type : null"
        v-on:click="$emit('click')"
        v-bind:class="{
                _accented: isAccented && !isDisabled,
                _bordered: isBordered,
                _disabled: isDisabled,
            }"
        >
        <slot />
    </component>
</template>

<script>
export default {
    name: 'ui-button',
    props: {
        isAccented: {
            type: Boolean,
            default: false,
        },
        isBordered: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'button',
        },
    },
    computed: {
        component() {
            if (this.type === 'submit' || this.type === 'button') {
                return 'button';
            }
            return 'div';
        },
    },
};
</script>

<style scoped lang="less">
@import '~theme';

.ui-button {
    .typography-body-md-caps();

    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px 22px;

    color: @color-gray-lightest;
    font-weight: bold;
    text-align: center;

    background-color: @color-gray-darkest;

    cursor: pointer;
    user-select: none;

    transition-property: opacity;
    transition-duration: @duration-fast;
    transition-timing-function: @easing-default;
    &:active,
    &:focus {
        opacity: 0.8;
    }
    &._accented {
        background-color: @color-primary-main;
    }
    &._disabled {
        color: @color-gray-dark;

        background-color: @color-gray-main;

        pointer-events: none;
    }
    &._bordered {
        color: @color-gray-darkest;

        background-color: rgba(0, 0, 0, 0);

        box-shadow: inset 0 0 0 1px currentColor;
        &._disabled {
            color: @color-gray-main;
        }
        &._accented {
            color: @color-primary-main;
        }
    }
}
</style>
