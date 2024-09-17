import {body} from "express-validator";
import {inputCheckErrorsMiddleware} from "../../global-middiewares/inputCheckErrorsMiddleware";
import {blogsService} from "../blogs/3_blogsService";


export const postInputValidations = () => {
    return [
        titleValidation,
        shortDescriptionValidation,
        contentValidation,
        blogIdValidation,
        inputCheckErrorsMiddleware,
    ]
}

export const blogIdValidation = body('blogId')
    .isString().withMessage({message: 'There should be a string', field: 'blogId'})
    .trim().custom(async blogId => {
        const blog = await blogsService.findBlogById(blogId)
        if (!blog) {
            throw new Error()
        } else {
            return true
        }
    }).withMessage({message: 'Blog not found', field: 'blogId'})

export const titleValidation = body("title")
    .isString().withMessage({message: 'There should be a string', field: 'title'})
    .trim().isLength({min: 3, max: 30}).withMessage({message: 'string of 3 to 30 symbol.', field: 'title'})

export const shortDescriptionValidation = body('shortDescription')
    .isString().withMessage({message: 'There should be a string', field: 'shortDescription'})
    .trim().isLength({min: 3, max: 100}).withMessage({message: 'string of 3 to 100 symbol.', field: 'shortDescription'})

export const contentValidation = body('content')
    .isString().withMessage({message: 'There should be a string', field: 'content'})
    .trim().isLength({min: 3, max: 1000}).withMessage({message: 'string of 3 to 1000 symbol.', field: 'content'})

