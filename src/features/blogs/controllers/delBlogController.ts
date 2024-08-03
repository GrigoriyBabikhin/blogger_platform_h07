import {Request, Response} from "express";
import {blogsRepository} from "../blogsMongoRepository";

export const delBlogController = async (
    req: Request<{blogId: string}>,
    res: Response) => {
    const isDeleted = await blogsRepository.deleteBlog(req.params.blogId)

    if(isDeleted){
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}