import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {db} from "../../../db/db";
import {blogsRepository} from "../blogsRepository";

export const findBlogController = (
    req: Request<{blogId: string}>,
    res: Response<BlogViewModel>
) => {

    let blog: BlogViewModel | undefined = blogsRepository.findBlogID(req.params.blogId)
    if (!blog) {
        res.status(404).json()
        return
    }
    res.status(200).json(blog)
}