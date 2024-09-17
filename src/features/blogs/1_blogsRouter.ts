import {Router} from "express";
import {idValidation, blogsInputValidations, blogsIdValidation} from "./blogsInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {blogsController} from "./2_blogsController";
import {inputCheckErrorsMiddleware} from "../../global-middiewares/inputCheckErrorsMiddleware";


export const blogsRouter = Router({})

blogsRouter.get('/', blogsController.getAllBlogs)
blogsRouter.post('/', adminAuthentication, ...blogsInputValidations(), blogsController.createBlog)
blogsRouter.get('/:blogId', ...blogsIdValidation(), blogsController.getBlogById)
blogsRouter.put('/:blogId', adminAuthentication,...blogsIdValidation(), ...blogsInputValidations(), blogsController.updateBlog)
blogsRouter.delete('/:blogId', adminAuthentication,...blogsIdValidation(), blogsController.deleteBlog)



