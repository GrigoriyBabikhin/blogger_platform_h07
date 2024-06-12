import {Request, Response} from "express";
import {PostViewModel} from "../../../input-output-types/post-types";
import {db} from "../../../db/db";

export const getPostsController = (
    req: Request,
    res: Response<PostViewModel[]>) => {
    res.status(200).json(db.posts)
}