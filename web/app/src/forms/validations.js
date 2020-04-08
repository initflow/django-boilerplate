import { required, minLength, sameAs, email as emailv } from 'vuelidate/lib/validators';

export const email = {
    value: {
        required,
        emailv,
    },
};

export const phone = {
    value: {
        required,
        minLength: minLength(7),
    },
};

export const password = {
    value: {
        required,
    },
};

export const passwordRepeat = {
    value: {
        required,
        sameAsPassword: sameAs(function() { return this.fields.passwordNew.value; }),
    },
};
