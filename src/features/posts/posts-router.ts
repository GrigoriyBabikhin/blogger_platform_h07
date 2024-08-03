import {Request, Response, Router} from "express";
import {getPostsController} from "./controllers/getPostsController";
import {createPostController} from "./controllers/createPostController";
import {findPostController} from "./controllers/findPostController";
import {putPostController} from "./controllers/putPostController";
import {delPostController} from "./controllers/delPostController";
import {postInputValidations} from "./postInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {postsRepository} from "./postsMongoRepository";

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.post('/', adminAuthentication, postInputValidations(), createPostController)
postsRouter.get("/:postId", findPostController)
postsRouter.put("/:postId", adminAuthentication, postInputValidations(), putPostController)
postsRouter.delete("/:postId", adminAuthentication, delPostController)
postsRouter.delete('/', adminAuthentication, async (
    req: Request,
    res: Response) => {
    const isDeleted = await postsRepository.deleteALL()
    if(isDeleted){
        res.status(204).json()
    } else {
        res.status(404).json()
    }
})