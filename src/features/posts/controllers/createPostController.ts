import {Request, Response} from "express";
import {PostInputModel, PostViewModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsRepository";


export const createPostController = async (
    req: Request<any, any, PostInputModel>,
    res: Response<PostViewModel>,
) => {
    const newPosts = await postsRepository.create(req.body)
    res.status(201).json(newPosts)

}