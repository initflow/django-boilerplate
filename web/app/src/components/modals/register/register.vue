<template>
    <div class="modal-register">
        <div class="modal-register__title">
            Вступить в Masters Art Family,<br/>чтобы начать учиться
        </div>
        <div class="modal-register__switch"
            v-on:click="switchHandler"
            >
            Уже есть аккаунт?
        </div>
        <form class="modal-register__form"
            v-on:keydown.enter="submit"
            >
            <div class="ui-form__section">
                <div class="ui-form__field"
                    v-for="(field, key) in form.fields"
                    v-bind:key="key"
                    >
                    <input class="ui-form__input _centred"
                        v-bind="{
                            type: field.type,
                            placeholder: field.placeholder,
                            autocomplete: field.autocomplete,
                            name: key,
                        }"
                        v-on:input="key === 'phone' ? phoneInputHandler() : null"
                        v-on:focus="key === 'phone' ? phoneFocusHandler() : null"
                        v-model="form.fields[key].value"
                        v-bind:class="{ _invalid: !form.fields[key].valid }"
                    />
                    <div class="ui-form__field-error"
                        v-text="field.error"
                    />
                </div>
            </div>
            <div class="ui-form__error"
                v-if="error"
                v-text="error"
            />
        </form>
        <label class="modal-register__subscribe">
            <div class="modal-register__subscribe-checkbox">
                <ui-input-checkbox
                    v-model="needSubscribe"
                />
            </div>
            <div class="modal-register__subscribe-text">
                Даю согласие на получение рассылки
            </div>
        </label>
        <div class="modal-register__form-button"
            v-on:click="submit"
            >
            <ui-button is-accented is-rarefied>
                Зарегистрироваться
            </ui-button>
        </div>
        <div class="modal-register__social">
            <div class="modal-register__social-description">
                Вход с через социальные сети
            </div>
            <div class="modal-register__social-list">
                <div class="modal-register__social-list">
                    <a class="modal-register__social-list-item"
                        href="/register/vk-oauth2/"
                        >
                        <icon name="vkontakte" />
                    </a>
                    <a class="modal-register__social-list-item"
                        href="/register/facebook/"
                        >
                        <icon name="facebook" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mainClient } from '~/network';

export default {
    name: 'modal-register',
    props: {
        redirectUrl: {
            type: String,
            default: null,
        },
    },
    data: () => ({
        isLoading: false,
        error: null,
        needSubscribe: true,
        form: {
            fields: {
                firstName: {
                    type: 'text',
                    placeholder: 'Имя',
                    autocomplete: 'given-name',
                    value: '',
                    valid: true,
                    error: 'Введите имя',
                },
                lastName: {
                    type: 'text',
                    placeholder: 'Фамилия',
                    autocomplete: 'family-name',
                    value: '',
                    valid: true,
                    error: 'Введите фамилию',
                },
                phone: {
                    type: 'tel',
                    placeholder: 'Телефон',
                    autocomplete: 'tel',
                    value: '',
                    valid: true,
                    error: 'Введите номер телефона',
                    prevValue: '',
                    regex: RegExp('^\\++([0-9]{1,11})$'),
                },
                email: {
                    type: 'email',
                    placeholder: 'Email',
                    autocomplete: 'email',
                    value: '',
                    valid: true,
                    error: 'Введите email',
                },
                password1: {
                    type: 'password',
                    placeholder: 'Пароль',
                    autocomplete: 'new-password',
                    value: '',
                    valid: true,
                    error: 'Введите пароль',
                },
                password2: {
                    type: 'password',
                    placeholder: 'Повторите пароль',
                    autocomplete: 'new-password',
                    value: '',
                    valid: true,
                    error: 'Повторите пароль',
                },
            },
        },
    }),
    methods: {
        switchHandler() {
            const props = {};
            if (this.redirectUrl) {
                props.redirectUrl = this.redirectUrl;
            }
            this.$store.commit('modals/pop');
            this.$store.commit('modals/push', {
                name: 'login',
                props,
            });
        },
        phoneFocusHandler() {
            if (!this.form.fields.phone.value) {
                this.form.fields.phone.prevValue = this.form.fields.phone.value;
                this.form.fields.phone.value = '+7';
            }
        },
        phoneInputHandler() {
            if (this.form.fields.phone.value.length === 0) {
                return;
            }
            const first3 = this.form.fields.phone.value.substring(0, 3);
            if (first3[0] === '+' && first3[1] !== '7') {
                this.form.fields.phone.value = `+7${this.form.fields.phone.value.substring(1, this.form.fields.phone.value.length - 1)}`;
            }

            this.form.fields.phone.value = this.form.fields.phone.value.substring(0, 1) + this.form.fields.phone.value.substring(1).replace(/\+./g, '');

            if (first3 === '8' || first3 === '7') {
                this.form.fields.phone.value = '+7';
            }
            if (first3 === '+78' || first3 === '+77') {
                this.form.fields.phone.value = `+7${this.form.fields.phone.value.substring(3)}`;
            }
            if (this.form.fields.phone.value.substring(0, 2) !== '+7') {
                if (this.form.fields.phone.value[0] !== '+') {
                    this.form.fields.phone.value = `+${this.form.fields.phone.value}`;
                }
                if (this.form.fields.phone.value[1] !== '7') {
                    if (this.form.fields.phone.value[1] === '8') {
                        this.form.fields.phone.value = `+7${this.form.fields.phone.value.substring(1)}`;
                    } else {
                        this.form.fields.phone.value = `+7${this.form.fields.phone.value.substring(0)}`;
                    }
                }
            }
            if (this.form.fields.phone.value.substring(0, 4) === '+7+7') {
                this.form.fields.phone.value = `+7${this.form.fields.phone.value.substring(4)}`;
            }
            if (this.form.fields.phone.value.substring(0, 3) === '+78' && this.form.fields.phone.value.length >= 13) {
                this.form.fields.phone.value = `+7${this.form.fields.phone.value.substring(3)}`;
            }
            this.form.fields.phone.value = `+${this.form.fields.phone.value.substring(1).replace(/[^0-9]/g, '').substring(0, 11)}`;
        },
        validate() {
            let valid = true;
            for (const [key, field] of Object.entries(this.form.fields)) {
                if (!field.value) {
                    valid = false;
                    this.form.fields[key].valid = false;
                } else {
                    this.form.fields[key].valid = true;
                }
            }
            if (valid) {
                if (this.form.fields.password1.value !== this.form.fields.password2.value) {
                    this.error = 'Введенные пароли не совпадают';
                    valid = false;
                } else {
                    this.error = null;
                }
            }
            return valid;
        },
        submit() {
            if (this.isLoading) {
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.isLoading = true;
            this.$store.commit('modals/push', 'loader');
            if (this.needSubscribe) {
                this.subscribe();
            }
            this.register();
        },
        async subscribe() {
            const { error, status } = await mainClient.common.subscribe({
                email: this.form.fields.email.value,
            });
            if (error) {
                console.error(error, status);
                console.error('Error above relates to component modal-register subscribe method');
                this.error = 'Ошибка подписки, проверьте email';
                this.isLoading = false;
                this.$store.commit('modals/pop');
            }
        },
        async register() {
            const formData = new FormData();
            formData.append('first_name', `${this.form.fields.firstName.value}${this.form.fields.firstName.value && this.form.fields.lastName.value ? ' ' : ''}${this.form.fields.lastName.value}`);
            formData.append('phone_number', this.form.fields.phone.value);
            formData.append('email', this.form.fields.email.value);
            formData.append('password1', this.form.fields.password1.value);
            formData.append('password2', this.form.fields.password2.value);

            const { error, status } = await mainClient.user.register(formData);
            if (error) {
                console.error(error, status);
                console.error('Error above relates to component modal-register register method');
                this.isLoading = false;
                if (status === 400) {
                    this.error = 'Данный email уже зарегистрирован';
                } else {
                    this.error = 'Ошибка регистрации, проверьте введенные данные';
                }
                this.$store.commit('modals/pop');
            } else {
                this.error = null;
                if (this.redirectUrl) {
                    window.location.href = this.redirectUrl;
                } else {
                    window.location.reload();
                }
            }
        },
    },
};
</script>

<style scoped lang="less">
@import '~theme';

.modal-register {
    .modal();

    &__title {
        margin-bottom: 19px;

        font-size: 2.4rem;
        line-height: 3.6rem;
        text-align: center;
    }
    &__switch {
        color: @color-accent;
        font-size: 1.2rem;
        text-align: center;
        text-decoration: underline;

        cursor: pointer;
        &:hover {
            text-decoration: none;
        }
    }
    &__form {
        width: 100%;
        max-width: 350px;
        margin: 21px auto 18px;
        &-input {
            font-size: 1.8rem;
            text-align: center;
        }
        &-button {
            display: block;
            width: 100%;
            max-width: 270px;
            height: 60px;
            margin: 21px auto;

            font-size: 1.4rem;
            text-decoration: none;
        }
    }
    &__subscribe {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 400px;
        max-width: 100%;
        margin: 0 auto 40px;

        cursor: pointer;
        &-checkbox {
            padding-right: 20px;
        }
        &-text {
            font-size: 1.4rem;
            line-height: 1.35;
        }
    }
    &__social {
        &-description {
            margin-bottom: 15px;

            font-size: 1.2rem;
            color: @color-text-support;
            text-align: center;
        }
        &-list {
            display: flex;
            align-items: center;
            justify-content: center;
            &-item {
                margin: 0 12px;

                font-size: 2.4rem;
            }
        }
    }
    @media @media-md-down {
        &__title {
            margin-bottom: 9px;
        }
        &__form {
            margin-top: 10px;
            &-button {
                max-width: none;
                height: 50px;
                margin-top: 24px;
            }
        }
        &__social {
            margin: auto auto 0;
        }
    }
}
</style>
