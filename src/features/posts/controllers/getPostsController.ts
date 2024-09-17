import {Request, Response} from "express";
import {PostViewModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsMongoRepository";

export const getPostsController = async (
    req: Request,
    res: Response<PostViewModel[] | null>) => {
    const posts = await postsRepository.mapAndGetAll()
    res.status(200).json(posts)
}