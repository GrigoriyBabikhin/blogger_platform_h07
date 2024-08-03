import {Request, Response} from "express";
import {blogsRepository} from "../blogs/blogsMongoRepository";
import {postsRepository} from "../posts/postsMongoRepository";

export const delTestingController = async (req: Request, res: Response) => {
    await blogsRepository.deleteALL()
    await postsRepository.deleteALL()
    res.status(204).json()
}