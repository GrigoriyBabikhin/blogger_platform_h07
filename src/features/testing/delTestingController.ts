import {Request, Response} from "express";
import {blogsService} from "../blogs/3_blogsService";
import {postsRepository} from "../posts/repsitory/postsMongoRepository";

export const delTestingController = async (req: Request, res: Response) => {
    await blogsService.deleteALL()
    await postsRepository.deleteALL()
    res.status(204).json()
}