import {Request, Response} from "express";
import {blogsService} from "../blogs/blogs-service";
import {postsRepository} from "../posts/postsMongoRepository";

export const delTestingController = async (req: Request, res: Response) => {
    await blogsService.deleteALL()
    await postsRepository.deleteALL()
    res.status(204).json()
}