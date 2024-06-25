import {body, validationResult} from "express-validator";

export const descriptionValidation = body('description')
    .notEmpty().withMessage('There should be a string')
    .trim().isLength({min: 3, max: 500}).withMessage('string of 3 to 500 symbol.')

export const nameValidation = body('name')
    .notEmpty().withMessage('There should be a string')
    .trim().isLength({min: 3, max: 15}).withMessage('string of 3 to 15 symbol.')

export const websiteUrlValidation = body('websiteUrl')
    .notEmpty().withMessage('There should be a string')
    .trim().isURL().withMessage('The URL must be https://')
    .isLength({min: 10, max: 100}).withMessage('string of 10 to 100 symbol.')


export const blogsInputValidations = () => {
    return [
        nameValidation,
        descriptionValidation,
        websiteUrlValidation,
    ]
}