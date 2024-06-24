import {Router} from "express";
import {getBlogsController} from "./controllers/getBlogsController";
import {createBlogController} from "./controllers/createBlogController";
import {findBlogController} from "./controllers/findBlogController";
import {putBlogController} from "./controllers/putBlogController";
import {delBlogController} from "./controllers/delBlogController";
import {blogsInputValidations} from "./validators-middlewares/input-validation";
import {inputValidationMiddlewares} from "../../global-middiewares/input-validation-middlewares";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', blogsInputValidations(), inputValidationMiddlewares, createBlogController)
blogsRouter.get('/:blogId', findBlogController)
blogsRouter.put('/:blogId', blogsInputValidations(), inputValidationMiddlewares, putBlogController)
blogsRouter.delete('/:blogId', delBlogController)