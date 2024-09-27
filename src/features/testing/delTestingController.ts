import {Request, Response} from "express";
import {blogsService} from "../blogs/3_blogsService";
import {postsService} from "../posts/3_postsServese";

export const delTestingController = async (req: Request, res: Response) => {
    await blogsService.deleteAllBlogs()
    await postsService.deleteALLPosts()
    res.status(204).json()
}