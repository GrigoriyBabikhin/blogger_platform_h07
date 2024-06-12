import {Request, Response} from "express";
import {db} from "../../../db/db";

export const delBlogController = (
    req: Request<{blogId: string}>,
    res: Response) => {
    const blogID: string = req.params.blogId
    const blog = db.blogs.find(b => b.id === blogID)
    if (!blog) {
        res.status(404).json()
        return
    }

    db.blogs = db.blogs.filter(b => b.id !== blogID)
    res.status(204).json()

}