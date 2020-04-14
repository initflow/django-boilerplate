<template>
    <div class="plugin-common-spacer">
        <div class="plugin-common-spacer__desktop"
            v-bind:style="this.baseStyles"
        />
        <div class="plugin-common-spacer__mobile"
            v-bind:style="this.mobileStyles"
        />
    </div>
</template>

<script>
export default {
    name: 'plugin-common-spacer',
    props: {
        base: {
            type: Number,
            default: 0,
        },
        mobile: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        baseStyles() {
            if (this.base === 0) {
                return null;
            }
            return `${this.base > 0 ? 'height' : 'margin-top'}: ${this.base}px`;
        },
        mobileStyles() {
            if (this.mobile === 0) {
                return this.baseStyles;
            }
            return `${this.mobile > 0 ? 'height' : 'margin-top'}: ${this.mobile}px`;
        },
    },
};
</script>

<style lang="less">
@import '~theme';

.plugin-common-spacer {
    pointer-events: none;
    &__desktop {
        display: block;
    }
    &__mobile {
        display: none;
    }
    @media @media-md-down {
        &__desktop {
            display: none;
        }
        &__mobile {
            display: block;
        }
    }
}
</style>
