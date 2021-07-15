import * as Validator from './validator';

export const FormInputError = ({field, portalSettings}) => {
    if (field.required && !field.value) {
        switch (field.name) {
        case 'name':
            //return `Enter your name`;
            return portalSettings.fields.signupInputErrors.name;
        
        case 'email':
            //return `Enter your email address`;
            return portalSettings.fields.signupInputErrors.email;

        default:
            //return `Please enter ${field.name}`;
            return portalSettings.fields.signupInputErrors.default;
        }
    }

    if (field.type === 'email' && !Validator.isValidEmail(field.value)) {
        return `Invalid email address`;
    }
    return null;
};

export const ValidateInputForm = ({fields, portalSettings}) => {
    const errors = {};
    fields.forEach((field) => {
        const name = field.name;
        const fieldError = FormInputError({field , portalSettings});
        errors[name] = fieldError;
    });
    return errors;
};