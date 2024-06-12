import {Request, Response} from "express";
import {PostViewModel} from "../../../input-output-types/post-types";
import {db} from "../../../db/db";

export const findPostController = (
    req: Request<{postId: string}>,
    res: Response<PostViewModel>,
) => {
    const postId: string = req.params.postId
    const post: PostViewModel | undefined = db.posts.find(p => p.id === postId)
    if (!post) {
        res.status(404).json()
        return
    }
    res.status(200).json(post)
}