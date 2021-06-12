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
const validation = async (req, res, next) => {

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

///validation function for add order route request body
const NewOrderValidationRules = () => {
    return [
        body('total_price').exists()
            .withMessage('Total Price is required')
            .isInt().withMessage("Total Price must be numerical"),
        body('products').exists()
            .withMessage('Products is required')
            .isArray().withMessage('products must be array'),
    ]
}


///validation function for update order status route request body
const UpdateOrderStatusValidationRules = () => {
    return [
        body('status').exists()
            .withMessage('status is required')
            .matches(/\b(?:accepted|rejected|pending)\b/).withMessage("Total Price must be numerical"),
    ]
}




module.exports = {
    registerValidationRules,
    validation,
    LoginValidationRules,
    NewOrderValidationRules,
    UpdateOrderStatusValidationRules
}