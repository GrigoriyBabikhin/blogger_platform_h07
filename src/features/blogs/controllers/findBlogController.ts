import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {db} from "../../../db/db";

export const findBlogController = (
    req: Request<{blogId: string}>,
    res: Response<BlogViewModel>
) => {
    let blogID: string = req.params.blogId
    let blog: BlogViewModel | undefined = db.blogs.find(b => b.id === blogID)
    if (!blog) {
        res.status(404).json()
        return
    }
    res.status(200).json(blog)
}