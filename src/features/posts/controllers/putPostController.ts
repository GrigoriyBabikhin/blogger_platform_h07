import {Request, Response} from "express";
import {PostInputModel} from "../../../input-output-types/post-types";
import {PostsDbType} from "../../../db/post-db-type";
import {db} from "../../../db/db";

export const putPostController =  (
    req: Request<{postId: string}, any, PostInputModel>,
    res: Response,) => {
    const postId: string = req.params.postId
    const post: PostsDbType | undefined = db.posts.find(p => p.id === postId)
    if (!post) {
        res.status(404).json()
        return
    }
    const {title, shortDescription, content, blogId} = req.body
    if (post) {
        post.title = title
        post.shortDescription = shortDescription
        post.content = content
        post.blogId = blogId
    }
    res.status(204).json(post)
}