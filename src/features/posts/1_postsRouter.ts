import {Router} from "express";
import {postIdValidations, postInputValidations} from "./postInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {postsController} from "./2_postsController";

export const postsRouter = Router()

postsRouter.get('/', postsController.getAllPosts)
postsRouter.post('/', adminAuthentication, ...postInputValidations(), postsController.createPost)
postsRouter.get("/:postId", ...postIdValidations(), postsController.getPostById)
postsRouter.put("/:postId", adminAuthentication, ...postIdValidations(), ...postInputValidations(), postsController.updatePost)
postsRouter.delete("/:postId", adminAuthentication, ...postIdValidations(), postsController.deletePost)
