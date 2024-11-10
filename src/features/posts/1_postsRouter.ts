import {Router} from "express";
import {postIdValidations, postInputValidations} from "./postInputValidations";
import {baseAuthGuard} from "../auth/guards/baseAuthGuard";
import {postsController} from "./2_postsController";

export const postsRouter = Router()

postsRouter.get('/', postsController.getAllPosts)
postsRouter.post('/', baseAuthGuard, ...postInputValidations(), postsController.createPost)
postsRouter.get("/:postId", ...postIdValidations(), postsController.getPostById)
postsRouter.put("/:postId", baseAuthGuard, ...postIdValidations(), ...postInputValidations(), postsController.updatePost)
postsRouter.delete("/:postId", baseAuthGuard, ...postIdValidations(), postsController.deletePost)
