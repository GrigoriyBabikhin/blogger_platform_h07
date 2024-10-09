import {Router} from "express";
import {blogsInputValidations, blogIdParamValidations} from "./blogsInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {blogsController} from "./2_blogsController";
import {PostInputByBlogValidations} from "../posts/postInputValidations";

export const blogsRouter = Router({})

blogsRouter.get('/', blogsController.getAllBlogs)
blogsRouter.post('/', adminAuthentication, ...blogsInputValidations(), blogsController.createBlog)
blogsRouter.get('/:blogId/posts', ...blogIdParamValidations(), blogsController.getPostsByBlogId)
blogsRouter.post('/:blogId/posts', adminAuthentication, ...blogIdParamValidations(), ...PostInputByBlogValidations(), blogsController.createPostByBlogId)
blogsRouter.get('/:blogId', ...blogIdParamValidations(), blogsController.getBlogById)
blogsRouter.put('/:blogId', adminAuthentication, ...blogIdParamValidations(), ...blogsInputValidations(), blogsController.updateBlog)
blogsRouter.delete('/:blogId', adminAuthentication, ...blogIdParamValidations(), blogsController.deleteBlog)



