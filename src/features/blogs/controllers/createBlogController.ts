import {Request, Response} from "express";
import {BlogInputModel, BlogViewModel} from "../../../input-output-types/blogs-types";
import {BlogsDbType} from "../../../db/blog-db-type";
import {db} from "../../../db/db";
import {blogsRepository} from "../blogsRepository";

export const createBlogController = (
    req: Request<any, any, BlogInputModel>,//BlogInputModel данные в теле запроса
    res: Response<BlogViewModel> //BlogViewModel данные в теле ответа
) => {
    const newBlog = blogsRepository.create(req.body)
    res.status(201).json(newBlog)
}