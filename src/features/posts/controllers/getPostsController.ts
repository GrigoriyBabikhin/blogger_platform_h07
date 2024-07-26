import {Request, Response} from "express";
import {PostViewModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsRepository";

export const getPostsController = async (
    req: Request,
    res: Response<PostViewModel[]>) => {
    const posts = await postsRepository.getAll()
    res.status(200).json(posts)
}