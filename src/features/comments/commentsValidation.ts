import {body} from "express-validator";
import {inputCheckErrorsMid} from "../../utilities/inputCheckErrors/inputCheckErrorsMid";

export const commentsInputValidation = () => [
    commentsBodyValidation, inputCheckErrorsMid
]

export const commentsBodyValidation = body('content')
    .isString().withMessage({message: 'There should be a string', field: 'content'})
    .trim().isLength({min: 20, max: 300})
    .withMessage({message: 'string of 20 to 300 symbol.', field: 'content'})