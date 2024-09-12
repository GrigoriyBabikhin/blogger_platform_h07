import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogMongoQueryRepository} from "../blogMongoQueryRepository";
import {Paginator} from "../../../input-output-types/paginator-type";
import {SortingQueryField} from "../../utilities/paginationAndSorting";





export const getBlogsController = async (
    req: Request<any, any, any, SortingQueryField>,
    res: Response<Paginator<BlogViewModel[]> | null>) => {

    const blogs = await blogMongoQueryRepository.getAllBlogs(req.query)
    res.status(200).json(blogs)
}

//router
