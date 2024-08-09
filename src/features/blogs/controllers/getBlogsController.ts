import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogsRepository} from "../blogsMongoRepository";


export const getBlogsController = async (
    req: Request,
    res: Response<BlogViewModel[] | null>) => {
    const blogs = await blogsRepository.mapAndGetAll()
    res.status(200).json(blogs)
}