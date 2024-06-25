import {body} from "express-validator";

export const blogsInputValidations = () => {
    return [
        nameValidation,
        descriptionValidation,
        websiteUrlValidation,
    ]
}

export const descriptionValidation = body('description')
    .isString().withMessage('There should be a string')
    .trim().isLength({min: 3, max: 500}).withMessage('string of 3 to 500 symbol.')

export const nameValidation = body('name')
    .isString().withMessage('There should be a string')
    .trim().isLength({min: 3, max: 15}).withMessage('string of 3 to 15 symbol.')

export const websiteUrlValidation = body('websiteUrl')
    .isString().withMessage('There should be a string')
    .trim().isURL().withMessage('The URL must be https://')
    .isLength({min: 10, max: 100}).withMessage('string of 10 to 100 symbol.')


