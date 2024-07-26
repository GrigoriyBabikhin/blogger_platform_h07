import {Request, Response} from "express";
import {BlogInputModel, BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogsRepository} from "../blogsRepository";

export const putBlogController = async (
    req: Request<{ blogId: string }, any, BlogInputModel>,
    res: Response
) => {

    const isUpdated : boolean = await blogsRepository.updateBlog(req.params.blogId, req.body)
    if (!isUpdated) {
        res.status(404).json()
    } else {
        const blog: BlogViewModel | undefined = await blogsRepository.findBlogById(req.params.blogId)
        res.status(204).json(blog)
    }

}