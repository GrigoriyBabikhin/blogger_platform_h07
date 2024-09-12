import {Router} from "express";
import {blogsInputValidations} from "./blogsInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {blogController} from "./blogController";



export const blogsRouter = Router({})

blogsRouter.get('/', blogController.getBlogsController)
blogsRouter.post('/', adminAuthentication, blogsInputValidations(), blogController.createBlogController)
blogsRouter.get('/:blogId', blogController.findBlogController)
blogsRouter.put('/:blogId', adminAuthentication, blogsInputValidations(), blogController.putBlogController)
blogsRouter.delete('/:blogId', adminAuthentication, blogController.delBlogController)



