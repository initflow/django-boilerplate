<template>
    <div class="modal-login">
        <div class="modal-login__title">
            Пожалуйста, войдите,<br/>чтобы продолжить
        </div>
        <div class="modal-login__switch"
            v-on:click="switchHandler"
            >
            Еще нет аккаунта?
        </div>
        <form class="modal-login__form"
            v-on:keydown.enter="submit"
            >
            <div class="ui-form__section">
                <div class="ui-form__field">
                    <input class="ui-form__input _centred"
                        type="email"
                        placeholder="Email"
                        name="username"
                        autocomplete="username"
                        v-model="form.fields.email.value"
                    />
                </div>
                <div class="ui-form__field">
                    <input class="ui-form__input _centred"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        autocomplete="current-password"
                        v-model="form.fields.password.value"
                    />
                    <div class="ui-form__hint _right">
                        <a class="ui-form__hint-link"
                            href="/ru/shop/password-reset/"
                            >
                            Забыли пароль?
                        </a>
                    </div>
                </div>
            </div>
            <div class="ui-form__error"
                v-bind:class="{
                    _hidden: !hasError,
                }"
                >
                Неверный email или пароль
            </div>
            <div class="modal-login__form-button"
                v-on:click="submit"
                >
                <ui-button is-accented is-rarefied>
                    Войти
                </ui-button>
            </div>
        </form>
        <div class="modal-login__social">
            <div class="modal-login__social-description">
                Вход с через социальные сети
            </div>
            <div class="modal-login__social-list">
                <div class="modal-login__social-list">
                    <a class="modal-login__social-list-item"
                        href="/login/vk-oauth2/"
                        >
                        <icon name="vkontakte" />
                    </a>
                    <a class="modal-login__social-list-item"
                        href="/login/facebook/"
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
    name: 'modal-login',
    props: {
        redirectUrl: {
            type: String,
            default: null,
        },
    },
    data: () => ({
        isLoading: false,
        hasError: false,
        form: {
            fields: {
                email: {
                    value: '',
                },
                password: {
                    value: '',
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
                name: 'register',
                props,
            });
        },
        async submit() {
            if (this.isLoading) {
                return;
            }
            if (!this.form.fields.email.value || !this.form.fields.password.value) {
                this.hasError = true;
                return;
            }
            this.isLoading = true;
            this.$store.commit('modals/push', 'loader');

            const { error, status } = await mainClient.user.login({
                username: this.form.fields.email.value,
                password: this.form.fields.password.value,
            });
            if (error) {
                console.error(error, status);
                console.error('Error above relates to component modal-login submit method');
                this.hasError = true;
                this.isLoading = false;
                this.$store.commit('modals/pop');
            } else {
                this.hasError = false;
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

.modal-login {
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
            margin: 28px auto 0;

            font-size: 1.4rem;
            text-decoration: none;
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
        &__form {
            margin-top: 38px;
            &-button {
                max-width: none;
                height: 50px;
                margin-top: 41px;
            }
        }
        &__social {
            margin: auto auto 0;
        }
    }
}
</style>
