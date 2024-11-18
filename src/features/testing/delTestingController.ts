import {Request, Response} from "express";
import {blogsService} from "../blogs/3_blogsService";
import {postsService} from "../posts/3_postsService";
import {usersMongoRepository} from "../users/repository/usersMongoRepository";

export const delTestingController = async (req: Request, res: Response) => {
    await blogsService.deleteAllBlogs()
    await postsService.deleteALLPosts()
    await usersMongoRepository.deleteAll()
    res.status(204).json()
}