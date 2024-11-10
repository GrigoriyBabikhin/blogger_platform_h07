import {Router} from "express";
import {blogsInputValidations, blogIdParamValidations} from "./blogsInputValidations";
import {baseAuthGuard} from "../auth/guards/baseAuthGuard";
import {blogsController} from "./2_blogsController";
import {PostInputByBlogValidations} from "../posts/postInputValidations";

export const blogsRouter = Router({})

blogsRouter.get('/', blogsController.getAllBlogs)
blogsRouter.post('/', baseAuthGuard, ...blogsInputValidations(), blogsController.createBlog)
blogsRouter.get('/:blogId/posts', ...blogIdParamValidations(), blogsController.getPostsByBlogId)
blogsRouter.post('/:blogId/posts', baseAuthGuard, ...blogIdParamValidations(), ...PostInputByBlogValidations(), blogsController.createPostByBlogId)
blogsRouter.get('/:blogId', ...blogIdParamValidations(), blogsController.getBlogById)
blogsRouter.put('/:blogId', baseAuthGuard, ...blogIdParamValidations(), ...blogsInputValidations(), blogsController.updateBlog)
blogsRouter.delete('/:blogId', baseAuthGuard, ...blogIdParamValidations(), blogsController.deleteBlog)



