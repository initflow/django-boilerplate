import { required, email as emailv } from 'vuelidate/lib/validators';

export const email = {
    value: {
        required,
        emailv,
    },
};

export const password = {
    value: {
        required,
    },
};
