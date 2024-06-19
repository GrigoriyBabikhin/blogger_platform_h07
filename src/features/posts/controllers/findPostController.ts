import {Request, Response} from "express";
import {PostViewModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsRepository";

export const findPostController = (
    req: Request<{postId: string}>,
    res: Response<PostViewModel>,
) => {
    const post = postsRepository.findPostById(req.params.postId)
    if(post){
        res.status(200).json(post)
    } else {
        res.status(404).json()
    }
    // const postId: string = req.params.postId
    // const post: PostViewModel | undefined = db.posts.find(p => p.id === postId)
    // if (!post) {
    //     res.status(404).json()
    //     return
    // }
    // res.status(200).json(post)
}