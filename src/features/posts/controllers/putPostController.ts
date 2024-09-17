import {Request, Response} from "express";
import {PostInputModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsMongoRepository";

export const putPostController = async (
    req: Request<{ postId: string }, any, PostInputModel>,
    res: Response,) => {

    const isUpdated = await postsRepository.updatePost(req.params.postId, req.body)
    if (!isUpdated) {
        res.status(404).json()
    } else {
        res.status(204).json()
    }
}