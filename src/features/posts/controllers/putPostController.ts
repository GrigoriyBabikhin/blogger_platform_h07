import {Request, Response} from "express";
import {PostInputModel} from "../../../input-output-types/post-types";
import {postsRepository} from "../postsRepository";

export const putPostController = (
    req: Request<{ postId: string }, any, PostInputModel>,
    res: Response,) => {
    const isUpdated = postsRepository.updatePost(req.params.postId, req.body)

    if (isUpdated) {
        const posts = postsRepository.findPostID(req.params.postId)
        res.status(204).json(posts)
    } else {
        res.status(404).json()
    }
    // const postId: string = req.params.postId
    // const post: PostsDbType | undefined = db.posts.find(p => p.id === postId)
    // if (!post) {
    //     res.status(404).json()
    //     return
    // }
    // const {title, shortDescription, content, blogId} = req.body
    // if (post) {
    //     post.title = title
    //     post.shortDescription = shortDescription
    //     post.content = content
    //     post.blogId = blogId
    // }
    // res.status(204).json(post)
}