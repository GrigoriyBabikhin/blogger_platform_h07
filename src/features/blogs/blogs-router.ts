import {Router} from "express";
import {getBlogsController} from "./controllers/getBlogsController";
import {createBlogController} from "./controllers/createBlogController";
import {findBlogController} from "./controllers/findBlogController";
import {putBlogController} from "./controllers/putBlogController";
import {delBlogController} from "./controllers/delBlogController";
import {blogsInputValidations} from "./middlewares/blogValidation";
import {inputCheckErrorsMiddleware} from "../../global-middiewares/inputCheckErrorsMiddleware";
import {adminMiddleware} from "../../global-middiewares/admin-middleware";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', adminMiddleware, blogsInputValidations(), inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:blogId', adminMiddleware, findBlogController)
blogsRouter.put('/:blogId', blogsInputValidations(), inputCheckErrorsMiddleware, putBlogController)
blogsRouter.delete('/:blogId', adminMiddleware, delBlogController)