<template>
    <label class="ui-input-checkbox"
        v-bind:aria-checked="value"
        role="checkbox"
        v-bind:aria-labelledby="labelId"
        >
        <div class="ui-input-checkbox__input">
            <ui-input-base-checkbox
                v-bind:value="model.value"
                v-on:change="updateValue"
            />
        </div>
        <div class="ui-input-checkbox__right"
            v-bind:id="labelId"
            >
            <div class="ui-input-checkbox__right-error"
                v-if="error && isInvalid"
                v-text="error"
            />
            <div class="ui-input-checkbox__right-label"
                v-if="$slots.default"
                >
                <slot />
            </div>
            <div class="ui-input-checkbox__right-label"
                v-else-if="model.label"
                v-text="model.label"
            />
        </div>
    </label>
</template>

<script>
export default {
    name: 'ui-input-checkbox',
    props: {
        model: {
            type: Object,
            default: () => ({}),
        },
        validation: {
            type: Object,
            default: null,
        },
        value: {
            type: Boolean,
            default: false,
        },
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    computed: {
        labelId() {
            return 'label-' + this.model.name;
        },
        isInvalid() {
            if (this.validation === null || this.validation === undefined) {
                return false;
            }
            return this.validation.$dirty && this.validation.$invalid;
        },
        error() {
            if (!this.model.errors || !this.validation) {
                return null;
            }
            const errorKeys = Object.keys(this.validation).filter(x => x.substring(0, 1) !== '$').filter(x => !this.validation[x]);
            const validErrorKey = errorKeys.find(x => this.model.errors[x] !== undefined);
            if (validErrorKey !== undefined) {
                return this.model.errors[validErrorKey];
            }
            return null;
        },
    },
    methods: {
        updateValue(value) {
            this.$emit('change', value);
        },
    },
};
</script>

<style scoped lang="less">
@import "~theme";

.ui-input-checkbox {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;

    cursor: pointer;
    &__input {
        flex: 0 0 auto;
        margin-right: 10px;
    }
    &__right {
        .typography-caption-md();

        flex: 1 1 auto;
        margin-top: -1px;
        &-error {
            margin-bottom: 6px;

            color: @color-primary-main;
        }
        &-label {
            /deep/ a {
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
