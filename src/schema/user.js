const { checkSchema } = require('express-validator');

const userLoginSchema = checkSchema({
    email: {
        isEmail: {
            errorMessage: 'Invalid email format',
        },
        normalizeEmail: true,
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long',
        },
        trim: true,
    },
});

const userRegisterSchema = checkSchema({
    fullName: {
        notEmpty: {
            errorMessage: 'Full name is required',
        },
        trim: true,
    },
    username: {
        notEmpty: {
            errorMessage: 'Username is required',
        },
        trim: true,
    },
    email: {
        isEmail: {
            errorMessage: 'Invalid email format',
        },
        normalizeEmail: true,
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long',
        },
        trim: true,
    },
});

module.exports = {
    userLoginSchema,
    userRegisterSchema,
};
