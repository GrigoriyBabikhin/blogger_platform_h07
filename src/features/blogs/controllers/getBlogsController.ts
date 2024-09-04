import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogsService} from "../blogs-service";


export const getBlogsController = async (
    req: Request,
    res: Response<BlogViewModel[] | null>) => {
    const blogs = await blogsService.mapAndGetAll()
    res.status(200).json(blogs)
}