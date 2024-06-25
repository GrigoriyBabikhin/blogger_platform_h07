import {Router} from "express";
import {getPostsController} from "./controllers/getPostsController";
import {createPostController} from "./controllers/createPostController";
import {findPostController} from "./controllers/findPostController";
import {putPostController} from "./controllers/putPostController";
import {delPostController} from "./controllers/delPostController";
import {postInputValidations} from "./middiewares/post-input-validations";
import {inputCheckErrorsMiddleware} from "../../global-middiewares/inputCheckErrorsMiddleware";

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.post('/', postInputValidations(), inputCheckErrorsMiddleware, createPostController)
postsRouter.get("/:postId", findPostController)
postsRouter.put("/:postId", postInputValidations(), inputCheckErrorsMiddleware, putPostController)
postsRouter.delete("/:postId", delPostController)