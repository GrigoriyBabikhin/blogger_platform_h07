import {Router} from "express";
import {idValidation, blogsBodyValidations, blogsIdValidation} from "./blogsBodyValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {blogsController} from "./blogsController";
import {inputCheckErrorsMiddleware} from "../../global-middiewares/inputCheckErrorsMiddleware";


export const blogsRouter = Router({})

blogsRouter.get('/', blogsController.getAllBlogs)
blogsRouter.post('/', adminAuthentication, ...blogsBodyValidations(), blogsController.createBlog)
blogsRouter.get('/:blogId', ...blogsIdValidation(), blogsController.getBlogById)
blogsRouter.put('/:blogId', adminAuthentication,...blogsIdValidation(), ...blogsBodyValidations(), blogsController.updateBlog)
blogsRouter.delete('/:blogId', adminAuthentication,...blogsIdValidation(), blogsController.deleteBlog)



