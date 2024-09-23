import {Router} from "express";
import {blogsInputValidations, blogIdParamValidations} from "./blogsInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {blogsController} from "./2_blogsController";

export const blogsRouter = Router({})

blogsRouter.get('/', blogsController.getAllBlogs)
blogsRouter.post('/', adminAuthentication, ...blogsInputValidations(), blogsController.createBlog)
blogsRouter.get('/:blogId/posts',...blogIdParamValidations(), blogsController.getPostsByBlogId)
blogsRouter.get('/:blogId', ...blogIdParamValidations(), blogsController.getBlogById)
blogsRouter.put('/:blogId', adminAuthentication,...blogIdParamValidations(), ...blogsInputValidations(), blogsController.updateBlog)
blogsRouter.delete('/:blogId', adminAuthentication,...blogIdParamValidations(), blogsController.deleteBlog)



