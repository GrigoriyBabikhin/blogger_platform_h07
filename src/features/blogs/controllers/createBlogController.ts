import {Request, Response} from "express";
import {BlogInputModel, BlogViewModel} from "../../../input-output-types/blogs-types";
import {BlogsDbType} from "../../../db/blog-db-type";
import {db} from "../../../db/db";

export const createBlogController = (
    req: Request<any, any, BlogInputModel>,//BlogInputModel данные в теле запроса
    res: Response<BlogViewModel> //BlogViewModel данные в теле ответа
) => {
    const {name, description, websiteUrl} = req.body
    //newBlog в единственном числе так как создаем 1 блог.
    let newBlog: BlogsDbType = {
        id: Date.now() + Math.random().toString(),
        name,
        description,
        websiteUrl
    }
    //добавляем в базу данных newBlog
    db.blogs.push(newBlog)
    res.status(201).json(newBlog)
}