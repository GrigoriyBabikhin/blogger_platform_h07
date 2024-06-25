import {body} from "express-validator";
import {blogsRepository} from "../../blogs/blogsRepository";

export const postInputValidations = () => {
    return [
        titleValidation,
        shortDescriptionValidation,
        contentValidation,
        blogIdValidation
    ]
}

export const blogIdValidation = body('blogId')
    .isString().withMessage('There should be a string')
    .trim().custom(blogId => {
        const blog = blogsRepository.findBlogById(blogId)
        if (!blog) {
            throw new Error('Blog not found')
        } else {
            return true
        }
    })

export const titleValidation = body("title")
    .isString().withMessage('There should be a string')
    .trim().isLength({min: 3, max: 30}).withMessage('string of 3 to 30 symbol.')
export const shortDescriptionValidation = body('shortDescription')
    .isString().withMessage('There should be a string')
    .trim().isLength({min: 3, max: 100}).withMessage('string of 3 to 100 symbol.')

export const contentValidation = body('content')
    .isString().withMessage('There should be a string')
    .trim().isLength({min: 3, max: 1000}).withMessage('string of 3 to 1000 symbol.')

