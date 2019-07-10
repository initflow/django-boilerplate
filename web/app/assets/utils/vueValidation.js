// Assume that form looks like
// form: {
//     valid: true,
//     fields: {
//         field: {
//             value: '',
//             name: 'field name',
//             type: 'password',
//             label: 'Your password',
//             valid: true,
//             error: 'Enter password',
//             validation: [
//                 {
//                     name: 'min-length',
//                     value: 1,
//                 },
//             ],
//         },
//     },
// }

export const validateField = (form, fieldKey) => {
    let valid = true;
    let error = null;
    const field = form.fields[fieldKey]
    if (field.hasOwnProperty('validation')) {
        field.validation.forEach(validation => {
            switch (validation.name) {
                case 'min-length':
                    if (field.value.length < validation.value) {
                        valid = false;
                        error = validation.error ? validation.error : null;
                    }
                    break;
                case 'regexp':
                    if (!RegExp(validation.value).test(field.value)) {
                        valid = false;
                        error = validation.error ? validation.error : null;
                    }
                    break;
                case 'equal-to':
                    if (field.value != form.fields[validation.value].value) {
                        valid = false;
                        error = validation.error ? validation.error : null;
                    }
                    break;
                case 'not-equal-to':
                    if (field.value == form.fields[validation.value].value) {
                        valid = false;
                        error = validation.error ? validation.error : null;
                    }
                    break;
                case 'exact':
                    if (field.value != validation.value) {
                        valid = false;
                        error = validation.error ? validation.error : null;
                    }
                    break;
            
                default:
                    break;
            }
        });
    }
    if (error !== null) {
        field.error = error;
    }
    field.valid = valid;
    return valid;
};
export const validateForm = (form, options = null) => {
    let valid = true;
    for (let field in form.fields) {
        if (form.fields.hasOwnProperty(field)) {
            let shouldBeValidated = true;
            if (options !== null) {
                if (options.mode === 'only' && options.fields) {
                    shouldBeValidated = options.fields.indexOf(field) !== -1;
                }
                if (options.mode === 'exept' && options.fields) {
                    shouldBeValidated = options.fields.indexOf(field) === -1;
                }
            }
            if (shouldBeValidated && !validateField(form, field)) {
                form.valid = false;
                valid = false;
            }
        }
    }
    return valid;
};

export const clearValidation = (form) => {
    form.valid = true;
    form.commonErrors = [];
    for (let field in form.fields) {
        if (form.fields.hasOwnProperty(field)) {
            form.fields[field].valid = true;
        }
    }
};