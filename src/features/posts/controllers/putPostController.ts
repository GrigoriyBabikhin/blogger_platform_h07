import {Request, Response} from "express";
import {PostInputModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsRepository";

export const putPostController = async (
    req: Request<{ postId: string }, any, PostInputModel>,
    res: Response,) => {
    const isUpdated = await postsRepository.updatePost(req.params.postId, req.body)

    if (isUpdated) {
        const posts = await postsRepository.findPostById(req.params.postId)
        res.status(204).json(posts)
    } else {
        res.status(404).json()
    }

}