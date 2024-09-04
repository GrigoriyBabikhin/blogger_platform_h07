import {Request, Response} from "express";
import {BlogInputModel} from "../../../input-output-types/blogs-types";
import {blogsService} from "../blogs-service";


export const putBlogController = async (
    req: Request<{ blogId: string }, any, BlogInputModel>,
    res: Response
) => {

    const isUpdated = await blogsService.updateBlog(req.params.blogId, req.body)
    if (!isUpdated) {
        res.status(404).json()
    } else {
        res.status(204).json()
    }
}