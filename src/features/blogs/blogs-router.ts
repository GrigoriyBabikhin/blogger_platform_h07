import {Router} from "express";
import {getBlogsController} from "./controllers/getBlogsController";
import {createBlogController} from "./controllers/createBlogController";
import {findBlogController} from "./controllers/findBlogController";
import {putBlogController} from "./controllers/putBlogController";
import {delBlogController} from "./controllers/delBlogController";
import {blogsInputValidations} from "./middlewares/blogValidation";
import {inputCheckErrorsMiddleware} from "../../global-middiewares/inputCheckErrorsMiddleware";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', adminAuthentication, blogsInputValidations(), inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:blogId', adminAuthentication, findBlogController)
blogsRouter.put('/:blogId', blogsInputValidations(), inputCheckErrorsMiddleware, putBlogController)
blogsRouter.delete('/:blogId', adminAuthentication, delBlogController)