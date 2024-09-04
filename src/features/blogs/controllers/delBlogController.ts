import {Request, Response} from "express";
import {blogsService} from "../blogs-service";


export const delBlogController = async (
    req: Request<{blogId: string}>,
    res: Response) => {
    const isDeleted = await blogsService.deleteBlog(req.params.blogId)

    if(isDeleted){
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}