import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogMongoQueryRepository} from "../blogMongoQueryRepository";
import {SortDirection} from "mongodb";




export const getBlogsController = async (
    req: Request,
    res: Response<BlogViewModel[] | null>) => {

    const blogs = await blogMongoQueryRepository.mapAndGetAll()
    res.status(200).json(blogs)
}

//router
