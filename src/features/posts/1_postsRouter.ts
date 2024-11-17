import {Router} from "express";
import {postIdValidations, postInputValidations} from "./postInputValidations";
import {baseAuthGuard} from "../auth/guards/baseAuthGuard";
import {postsController} from "./2_postsController";
import {accessTokenGuard} from "../auth/guards/accessTokenGuard";
import {commentsInputValidation} from "../comments/commentsValidation";

export const postsRouter = Router()

postsRouter.get('/', postsController.getAllPosts)
postsRouter.post('/', baseAuthGuard, ...postInputValidations(), postsController.createPost)
postsRouter.get('/:postId/comments', postsController.getComments)
postsRouter.post('/:postId/comments', accessTokenGuard, ...commentsInputValidation(), postsController.createComment)
postsRouter.get("/:postId", ...postIdValidations(), postsController.getPostById)
postsRouter.put("/:postId", baseAuthGuard, ...postIdValidations(), ...postInputValidations(), postsController.updatePost)
postsRouter.delete("/:postId", baseAuthGuard, ...postIdValidations(), postsController.deletePost)
