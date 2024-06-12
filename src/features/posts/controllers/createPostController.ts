import {Request, Response} from "express";
import {PostInputModel, PostViewModel} from "../../../input-output-types/post-types";
import {PostsDbType} from "../../../db/post-db-type";
import {db} from "../../../db/db";

export const createPostController = (
    req: Request<any, any, PostInputModel>,
    res: Response<PostViewModel>,
) => {
    const {title, shortDescription, content, blogId} = req.body
    const newPost: PostsDbType = {
        id: Date.now() + Math.random().toString(),
        title,
        shortDescription,
        content,
        blogId,
        blogName: "string"
    }
    db.posts.push(newPost)
    res.status(201).json(newPost)
}