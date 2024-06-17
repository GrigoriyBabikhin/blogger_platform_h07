import {Request, Response} from "express";
import {blogsRepository} from "../blogsRepository";

export const delBlogController = (
    req: Request<{ blogId: string }>,
    res: Response) => {

    const isDelete = blogsRepository.deleteBlog(req.params.blogId)
    //isDelete вернет true или false
    if (isDelete) {
        res.status(204).json()
        return
    } else {
        res.status(404).json()
    }
}