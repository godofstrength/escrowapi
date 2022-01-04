const {check, body, validationResult} = require('express-validator');

const signupValidation = () =>{
    return [
        body('email')
        .isEmail().withMessage('Email address field is not a valid one')
        .not().isEmpty().withMessage('Email is required'),
        body('password')
        .not().isEmpty().withMessage('password is required')
        .isStrongPassword({
            minLength: 6,
            minLowercase: 6,
            minUppercase: 1,
            minSymbols: 1
        }).withMessage('Password is too weak. Field must contain min. of 6 characters, 1 lowercase and uppercase character and a symbol')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({msg: err.msg}));
    
    res.json({
        statusCode: 400,
        errors: extractedErrors
    })
}

const loginValidation = () => {
    return [
        body('email')
        .not().isEmpty().withMessage('Email field is required'),
        body('password')
        .not().isEmpty().withMessage('Password field is required')
    ]
}

module.exports = {
    signupValidation,
    loginValidation,
    validate
}