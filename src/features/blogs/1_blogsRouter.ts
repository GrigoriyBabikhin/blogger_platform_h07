import {Router} from "express";
import {blogsInputValidations, blogsIdValidation} from "./blogsInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {blogsController} from "./2_blogsController";

export const blogsRouter = Router({})

blogsRouter.get('/', blogsController.getAllBlogs)
blogsRouter.post('/', adminAuthentication, ...blogsInputValidations(), blogsController.createBlog)
blogsRouter.get('/:blogId', ...blogsIdValidation(), blogsController.getBlogById)
blogsRouter.put('/:blogId', adminAuthentication,...blogsIdValidation(), ...blogsInputValidations(), blogsController.updateBlog)
blogsRouter.delete('/:blogId', adminAuthentication,...blogsIdValidation(), blogsController.deleteBlog)



