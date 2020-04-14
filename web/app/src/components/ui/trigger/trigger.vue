<template>
    <component class="ui-trigger"
        v-bind:is="component"
        v-bind:type="type ? type : null"
        v-bind:class="{
            _disabled: isDisabled,
        }"
        v-on:click="$emit('click')"
        >
        <slot />
    </component>
</template>

<script>
export default {
    name: 'ui-trigger',
    props: {
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

.ui-trigger {
    .typography-body-md-caps();

    padding: 12px 10px;

    text-decoration: underline;

    cursor: pointer;
    user-select: none;

    transition-property: opacity;
    transition-duration: @duration-fast;
    transition-timing-function: @easing-default;
    &:hover {
        text-decoration: none;
    }
    &:active,
    &:focus {
        opacity: 0.8;
    }
    &._disabled {
        opacity: 0.5;

        pointer-events: none;
    }
}
</style>
