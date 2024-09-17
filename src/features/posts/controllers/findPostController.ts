import {Request, Response} from "express";
import {PostViewModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsMongoRepository";

export const findPostController = async (
    req: Request<{ postId: string }>,
    res: Response<PostViewModel>,
) => {
    const post = await postsRepository.mapAndFindPostById(req.params.postId)
    if (!post) {
        res.status(404).json()
        return
    }
    res.status(200).json(post)
    return
}