import {Request, Response} from "express";
import {PostViewModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsRepository";

export const findPostController = async (
    req: Request<{postId: string}>,
    res: Response<PostViewModel>,
) => {
    const post =await postsRepository.findPostById(req.params.postId)
    if(post){
        res.status(200).json(post)
    } else {
        res.status(404).json()
    }

}