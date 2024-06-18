import {Request, Response} from "express";
import {PostViewModel} from "../../../input-output-types/post-types";
import {db} from "../../../db/db";
import {postsRepository} from "../postsRepository";

export const getPostsController = (
    req: Request,
    res: Response<PostViewModel[]>) => {
    const posts = postsRepository.getAll()
    res.status(200).json(posts)
}