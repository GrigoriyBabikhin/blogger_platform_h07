import {body, param} from "express-validator";
import {inputCheckErrorsMid} from "../../utilities/inputCheckErrors/inputCheckErrorsMid";

export const blogsInputValidations = () => [
    nameValidation, descriptionValidation, websiteUrlValidation, inputCheckErrorsMid
]

export const blogIdParamValidations = () => [
    blogIdParamValidation, inputCheckErrorsMid
]

export const descriptionValidation = body('description')
    .isString().withMessage({message: 'There should be a string', field: 'description'})
    .trim().isLength({min: 3, max: 500}).withMessage({message: 'string of 3 to 500 symbol.', field: 'description'})

export const nameValidation = body('name')
    .isString().withMessage({message: 'There should be a string', field: 'name'})
    .trim().isLength({min: 3, max: 15}).withMessage({message: 'string of 3 to 15 symbol.', field: 'name'})

export const websiteUrlValidation = body('websiteUrl')
    .isString().withMessage({message: 'There should be a string', field: 'websiteUrl'})
    .trim().matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$').withMessage({
        message: 'The URL must be https://',
        field: 'websiteUrl'
    })
    .isLength({min: 10, max: 100}).withMessage({message: 'string of 10 to 100 symbol.', field: 'websiteUrl'})
export const blogIdParamValidation = param('blogId').isMongoId().withMessage({message: 'Invalid MongoDB ID.', field: 'blogId'})

