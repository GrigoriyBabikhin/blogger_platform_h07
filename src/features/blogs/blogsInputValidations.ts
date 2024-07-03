import {body} from "express-validator";

export const blogsInputValidations = () => {
    return [
        nameValidation,
        descriptionValidation,
        websiteUrlValidation,
    ]
}

export const descriptionValidation = body('description')
    .isString().withMessage({message: 'There should be a string', field: 'description'})
    .trim().isLength({min: 3, max: 500}).withMessage({message: 'string of 3 to 500 symbol.', field: 'description'})

export const nameValidation = body('name')
    .isString().withMessage({message: 'There should be a string', field: 'name'})
    .trim().isLength({min: 3, max: 15}).withMessage({message: 'string of 3 to 15 symbol.', field: 'name'})

export const websiteUrlValidation = body('websiteUrl')
    .isString().withMessage({message: 'There should be a string', field: 'websiteUrl'})
    .trim().isURL().withMessage({message: 'The URL must be https://', field: 'websiteUrl'})
    .isLength({min: 10, max: 100}).withMessage({message: 'string of 10 to 100 symbol.', field: 'websiteUrl'})

//Expected data: { errorsMessages: [{ message: Any<String>, field: "websiteUrl" }, { message: Any<String>, field: "name" }] }
