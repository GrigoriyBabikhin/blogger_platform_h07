import {Router} from "express";
import {getBlogsController} from "./controllers/getBlogsController";
import {createBlogController} from "./controllers/createBlogController";
import {findBlogController} from "./controllers/findBlogController";
import {putBlogController} from "./controllers/putBlogController";
import {delBlogController} from "./controllers/delBlogController";

export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', createBlogController)
blogsRouter.get('/:blogId',findBlogController)
blogsRouter.put('/:blogId',putBlogController)
blogsRouter.delete('/:blogId',delBlogController)