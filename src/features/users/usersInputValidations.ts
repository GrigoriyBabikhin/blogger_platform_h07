import {body, param} from "express-validator";
import {inputCheckErrorsMid} from "../../utilities/Middleware/inputCheckErrors/inputCheckErrorsMid";

export const userBodyValidations = () => [
    loginBodyValidations, passwordBodyValidations, emailBodyValidations, inputCheckErrorsMid
]

export const loginBodyValidations = body('login')
    .isString().withMessage({message: 'There should be a string', field: 'login'})
    .trim()
    .isLength({min: 3, max: 10})
    .withMessage({message: 'string of 3 to 10 symbol.', field: 'login'})

export const passwordBodyValidations = body('password')
    .isString()
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage({message: 'string of 6 to 20 symbol.', field: 'password'})

export const emailBodyValidations = body('email')
    .isString()
    .trim()
    .isLength({min: 1, max: 500})
    .isEmail()
    .withMessage({message: 'string of 1 to 500 symbol.', field: 'email'})

export const loginOrEmailValidations = body('loginOrEmail')
    .isString()
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage({message: 'string of 1 to 500 symbol.', field: 'loginOrEmail'})

//({min: 1, max: 500})
