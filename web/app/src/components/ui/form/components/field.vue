<template>
    <div class="ui-form-field">
        <div class="ui-form-field__headline">
            <label class="ui-form-field__headline-label"
                v-if="model.label"
                v-bind:class="{ _invalid: isInvalid }"
                v-text="model.label + (model.label && isRequired ? '*' : '')"
                >
            </label>
            <div class="ui-form-field__headline-right">
                <div class="ui-form-field__headline-right-hint"
                    v-if="hint"
                    >
                    <a class="ui-form-field__headline-right-hint-link"
                        v-if="hint === 'recovery'"
                        href="#"
                        v-text="'Не помню пароль, помогите!'"
                    />
                </div>
                <div class="ui-form-field__headline-right-error"
                    v-if="error && isInvalid"
                    v-text="error"
                />
            </div>
        </div>
        <div class="ui-form-field__input">
            <component v-bind:is="input"
                v-bind:model="model"
                v-bind:value="value"
                v-bind:is-invalid="isInvalid"
                v-on:input="inputHandler"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ui-form-field',
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
            type: String,
        },
    },
    model: {
        prop: 'value',
        event: 'input',
    },
    computed: {
        input() {
            let component = 'ui-input-text';
            if (this.model.type === 'email') {
                component = 'ui-input-email';
            }
            if (this.model.type === 'checkbox') {
                component = 'ui-input-checkbox';
            }
            return component;
        },
        isRequired() {
            if (this.validation === null || this.validation === undefined) {
                return false;
            }
            return this.validation.$params.required !== undefined;
        },
        isInvalid() {
            if (this.validation === null || this.validation === undefined) {
                return false;
            }
            return this.validation.$dirty && this.validation.$invalid;
        },
        hint() {
            if (this.model.hint === undefined) {
                return null;
            }
            return this.model.hint;
        },
        error() {
            if (!this.model.error) {
                return null;
            }
            return this.model.error;
        },
    },
    methods: {
        inputHandler(newValue) {
            this.$emit('input', newValue);
        },
    },
};
</script>

<style scoped lang="less">
@import '~theme';

.ui-form-field {
    &__headline {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        &-label {
            display: block;
            margin-bottom: 8px;

            transition: color @duration-fast @easing-default;
            &._invalid {
                color: @color-primary-main;
            }
        }
        &-right {
            .typography-caption-md();

            text-align: right;
            &-hint {
                margin-bottom: 10px;

                color: @color-gray-dark;
                &-link {
                    text-decoration: none;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
            &-error {
                margin-bottom: 10px;

                color: @color-primary-main;
            }
        }
    }
    @media  @media-md-down {
    }
}
</style>
