<template>
    <div class="ui-form-field">
        <div class="ui-form-field__headline">
            <label class="ui-form-field__headline-label"
                v-if="model.label"
                v-text="model.label + (model.label && isRequired ? '*' : '')"
                >
            </label>
        </div>
        <div class="ui-form-field__input">
            <component v-bind:is="input"
                v-bind:model="model"
                v-bind:value="value"
                v-bind:is-invalid="isInvalid"
                v-on="getHandler(model.type)"
            />
                <!-- v-on:input="updateHandler" -->
        </div>
        <div class="ui-form-field__botline">
            <div class="ui-form-field__botline-error"
                v-if="error && isInvalid"
                v-text="error"
            />
            <div class="ui-form-field__botline-hint"
                v-if="hint"
                >
                <template v-if="hint === 'recovery'">
                    <a class="ui-form-field__botline-hint-link"
                        v-bind:href="passwordResetHref"
                        v-text="'Забыли пароль?'"
                    /> ↗
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import config from '~/config';

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
            if (this.model.type === 'email' ||
                this.model.type === 'phone' ||
                this.model.type === 'checkbox' ||
                this.model.type === 'select') {
                component = `ui-input-${this.model.type}`;
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
        passwordResetHref() {
            return config.urls.passwordReset;
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
        getHandler(type) {
            if (type === 'select' || type === 'checkbox') {
                return { change: this.updateHandler };
            } else {
                return { input: this.updateHandler };
            }
        },
        updateHandler(newValue) {
            this.$emit('update', newValue);
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
        }
    }
    &__botline {
        text-align: right;
        &-hint {
            padding-top: 5px;
            &-link {
                text-decoration: underline;
                &:hover {
                    text-decoration: none;
                }
            }
        }
        &-error {
            margin-bottom: 10px;

            color: @color-primary-main;
        }
    }
    @media  @media-md-down {
    }
}
</style>
