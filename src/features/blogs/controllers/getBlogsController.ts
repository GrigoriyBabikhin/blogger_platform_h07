import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogsRepository} from "../blogsMongoRepository";
import {BlogsDbType} from "../../../db/dbType/blog-db-type";

export const getBlogsController = async (
    req: Request,
    res: Response<BlogViewModel[]>) => {
    const blogs = await blogsRepository.getAll()
    res.status(200).json(blogs)
}