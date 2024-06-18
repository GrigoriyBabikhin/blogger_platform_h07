import {Request, Response} from "express";
import {PostInputModel, PostViewModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsRepository";


export const createPostController = (
    req: Request<any, any, PostInputModel>,
    res: Response<PostViewModel>,
) => {
    const newPosts = postsRepository.create(req.body)
    res.status(201).json(newPosts)
    // const {title, shortDescription, content, blogId} = req.body
    // const newPost: PostsDbType = {
    //     id: Date.now() + Math.random().toString(),
    //     title,
    //     shortDescription,
    //     content,
    //     blogId,
    //     blogName: "string"
    // }
    // db.posts.push(newPost)
    // res.status(201).json(newPost)
}