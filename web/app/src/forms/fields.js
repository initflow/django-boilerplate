export const name = {
    name: 'name',
    label: 'Ваше имя',
    type: 'text',
    autocomplete: 'name',
    placeholder: 'Имя',
    value: '',
    error: 'Введите имя',
};

export const email = {
    name: 'email',
    label: 'Email',
    type: 'email',
    autocomplete: 'email',
    regex: RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    placeholder: 'Адрес электронной почты',
    value: '',
    error: 'Введите корректный email',
};
export const password = {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    value: '',
    error: 'Введите пароль',
};

export const passwordNew = {
    ...password,
    autocomplete: 'new-password',
};

export const passwordCurrent = {
    ...password,
    autocomplete: 'current-password',
    hint: 'recovery',
};

export const policy = {
    name: 'policy',
    label: 'Согласен(-на) с Политикой конфиденциальности',
    type: 'checkbox',
    value: false,
    error: 'Необходимо принять политику конфиденциальности',
};
