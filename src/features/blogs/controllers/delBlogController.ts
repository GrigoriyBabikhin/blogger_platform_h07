import {Request, Response} from "express";
import {blogsRepository} from "../blogsRepository";

export const delBlogController = (
    req: Request<{blogId: string}>,
    res: Response) => {
    const isDeleted = blogsRepository.deleteBlog(req.params.blogId)
    if(isDeleted){
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}