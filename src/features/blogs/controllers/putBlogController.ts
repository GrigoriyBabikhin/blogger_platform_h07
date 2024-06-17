import {Request, Response} from "express";
import {BlogInputModel, BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogsRepository} from "../blogsRepository";

export const putBlogController = (
    req: Request<{ blogId: string }, any, BlogInputModel>,
    res: Response
) => {

    const isUpdated = blogsRepository.updateBlog(req.params.blogId, req.body)
    if (isUpdated) {
        const blog: BlogViewModel | undefined = blogsRepository.findBlogID(req.params.blogId)
        res.status(204).json(blog)
    } else {
        res.status(404).json()
    }
}