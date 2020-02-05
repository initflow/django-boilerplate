<template>
    <component class="ui-button"
        v-bind:is="component"
        v-bind:type="type ? type : null"
        v-on:click="$emit('click')"
        v-bind:class="{
                _accented: isAccented,
                _rarefied: isRarefied,
                _disabled: isDisabled,
                _solid: isSolid,
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
        isRarefied: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isSolid: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: null,
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 5px 10px;

    color: @color-text-main;
    font-weight: 600;
    letter-spacing: 0.1rem;
    line-height: 1.4;
    text-align: center;
    text-transform: uppercase;

    cursor: pointer;
    box-shadow: inset 0 0 0 1px @color-main;
    user-select: none;

    transition-property: box-shadow;
    transition-duration: @duration-fast;
    transition-timing-function: @easing-default;

    &:hover {
        box-shadow: inset 0 0 0 5px @color-main;
    }

    &._accented {
        color: @color-text-accent;

        box-shadow: inset 0 0 0 1px @color-accent;

        &:hover {
            box-shadow: inset 0 0 0 5px @color-accent;
        }
    }

    &._rarefied {
        letter-spacing: 0.18rem;
    }
    &._disabled,
    &._disabled:hover {
        color: @color-text-support;

        cursor: auto;
        pointer-events: none;
        box-shadow: inset 0 0 0 1px @color-background-support;
    }
    &._solid {
        color: @color-text-inverted;
        text-transform: none;
        letter-spacing: 0;
        font-weight: normal;

        background: @color-main;

        box-shadow: inset 0 0 0 0 @color-background;

        &:hover {
            box-shadow: inset 0 0 0 5px @color-background;
        }
    }
    &._solid._accented {
        color: @color-text-inverted;

        background: @color-accent;

        box-shadow: inset 0 0 0 0 @color-background;

        &:hover {
            box-shadow: inset 0 0 0 5px @color-background;
        }
    }
    &._solid._disabled {
        color: @color-text-support;

        background: @color-background-support;

        box-shadow: inset 0 0 0 0 @color-background;
    }
}
</style>
