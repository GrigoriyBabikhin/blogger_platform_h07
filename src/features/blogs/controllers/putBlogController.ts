import {Request, Response} from "express";
import {BlogInputModel, BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogsRepository} from "../blogsMongoRepository";

export const putBlogController = async (
    req: Request<{ blogId: string }, any, BlogInputModel>,
    res: Response
) => {

    const isUpdated = await blogsRepository.updateBlog(req.params.blogId, req.body)
    if (!isUpdated) {
        res.status(404).json()
    } else {
        res.status(204).json()
    }
}