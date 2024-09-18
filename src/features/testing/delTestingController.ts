import {Request, Response} from "express";
import {blogsService} from "../blogs/3_blogsService";
import {postsMongoRepository} from "../posts/repsitory/postsMongoRepository";

export const delTestingController = async (req: Request, res: Response) => {
    await blogsService.deleteALL()
    await postsMongoRepository.deleteALL()
    res.status(204).json()
}