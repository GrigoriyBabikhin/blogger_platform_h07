import {body, validationResult} from "express-validator";

export const nameValidation = body('name')
    .trim()
    .notEmpty()
    .isLength({min: 3, max: 15})
    .withMessage('The name length must be a string of 3 to 15 characters.')

export const descriptionValidation = body('description')
    .trim()
    .notEmpty()
    .isLength({min: 3, max: 500})
    .withMessage('The description must be a string of 3 to 500 characters.')

// const urlRegex  = new RegExp("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")

export const websiteUrlValidation = body('websiteUrl')
    .trim()
    .notEmpty()
    .isLength({min: 10, max: 100})
    .isURL()
    .withMessage("The URL must be https:// and be no more than 100 characters long.")

export const blogsInputValidations = () => {
    return [
        nameValidation,
        descriptionValidation,
        websiteUrlValidation,
    ]
}