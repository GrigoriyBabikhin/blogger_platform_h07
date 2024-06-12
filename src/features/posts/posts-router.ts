import {Router} from "express";
import {getPostsController} from "./controllers/getPostsController";
import {createPostController} from "./controllers/createPostController";
import {findPostController} from "./controllers/findPostController";
import {putPostController} from "./controllers/putPostController";
import {delPostController} from "./controllers/delPostController";

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.post('/', createPostController)
postsRouter.get("/:postId",findPostController)
postsRouter.put("/:postId",putPostController)
postsRouter.delete( "/:postId",delPostController)