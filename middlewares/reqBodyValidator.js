const { body, validationResult } = require('express-validator');


///validation function for register route request body
const registerValidationRules = () => {
    return [
        body('email').isEmail().withMessage("Invalid Email")          ///// request body validation
            .exists().withMessage('Email is required')
            .isLength({max:30}).withMessage('Email max length is 30'),
        body('username').exists()
            .withMessage('Username is required')
            .isLength({max:20}).withMessage('Username max length is 20'),
        body('gender').exists()
            .withMessage('Gender is required')
            .isLength({max:10}).withMessage('Gender max length is 10'),
        body('password').isLength({ min: 5 })
            .withMessage('Password must be at least 5 chars long')
    ]
}
const validateRegister = async (req, res, next) => {

    /////// check if there were any errors in req 
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(422).send({ error: errors.errors[0].msg });

}


///validation function for login route request body
const LoginValidationRules = () => {
    return [
        body('email').exists()
            .withMessage('Email is required')
            .isEmail().withMessage("Invalid Email"),
        body('password').exists()
            .withMessage('Password is required')

    ]
}

const validateLogin = async (req, res, next) => {

    /////// validate req body
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send({ error: errors.errors[0].msg });
    return next();
}

module.exports = {
    registerValidationRules,
    validateRegister,
    LoginValidationRules,
    validateLogin

}