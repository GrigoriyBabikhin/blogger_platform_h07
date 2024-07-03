import {Router} from "express";
import {getPostsController} from "./controllers/getPostsController";
import {createPostController} from "./controllers/createPostController";
import {findPostController} from "./controllers/findPostController";
import {putPostController} from "./controllers/putPostController";
import {delPostController} from "./controllers/delPostController";
import {postInputValidations} from "./postInputValidations";
import {inputCheckErrorsMiddleware} from "../../global-middiewares/inputCheckErrorsMiddleware";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.post('/', adminAuthentication, postInputValidations(), inputCheckErrorsMiddleware, createPostController)
postsRouter.get("/:postId", findPostController)
postsRouter.put("/:postId", adminAuthentication, postInputValidations(), inputCheckErrorsMiddleware, putPostController)
postsRouter.delete("/:postId", adminAuthentication, delPostController)