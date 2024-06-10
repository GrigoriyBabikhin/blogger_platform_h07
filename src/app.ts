import express from 'express'
import {Request, Response} from "express";
import {SETTINGS} from "./settings";
import {db} from "./db/db";
import {BlogsDbType} from "./db/db-type";
import {BodyBlogsType, ParamsIdBlogType} from "./input-output-types/request-response-types";

export const app = express()
app.use(express.json())

app.delete(SETTINGS.PATH.TESTING, (req: Request, res: Response) => {
    db.blogs.length = 0
    res.status(204).json()
})//зачистка базы данных перед тестами.

app.get(SETTINGS.PATH.BLOGS, (
    req: Request,
    res: Response<BlogsDbType[]>) => {
    res.status(200).json((db.blogs))
})

app.post(SETTINGS.PATH.BLOGS, (
    req: Request<any, any, BodyBlogsType>,// Используем BodyBlogsType для тела запроса
    res: Response<BlogsDbType> // Используем BlogsDbType для тела ответа
) => {
    const {name, description, websiteUrl} = req.body
    //newBlog в единственном числе так как создаем 1 блог.
    let newBlog: BlogsDbType = {
        id: Date.now() + Math.random().toString(),
        name,
        description,
        websiteUrl
    }
    db.blogs.push(newBlog)
    res.status(201).json(newBlog)
})

app.get(SETTINGS.PATH.BLOGS + '/:blogId', (
    req: Request<ParamsIdBlogType>,
    res: Response<BlogsDbType>
) => {
    let blogID: string = req.params.blogId
    let blog: BlogsDbType | undefined = db.blogs.find(b => b.id === blogID)
    if (!blog) {
        res.status(404).json()
        return
    }
    res.status(200).json(blog)
})

app.put(SETTINGS.PATH.BLOGS + '/:blogId', (
    req: Request<ParamsIdBlogType, any, BodyBlogsType>,
    res: Response<BlogsDbType>
) => {
    let blogID: string = req.params.blogId
    let blog: BlogsDbType | undefined = db.blogs.find(b => b.id === blogID)
    if (!blog) {
        res.status(404).json()
        return
    }

    const {name, description, websiteUrl} = req.body

    if (blog) {
        blog.name = name
        blog.description = description
        blog.websiteUrl = websiteUrl
    }
    res.status(204).json(blog)
})

app.delete(SETTINGS.PATH.BLOGS + '/:blogId', (
    req: Request<ParamsIdBlogType>,
    res: Response) => {
    const blogID: string = req.params.blogId
    const blog = db.blogs.find(b => b.id === blogID)
    if (!blog) {
        res.status(404).json()
        return
    }

    db.blogs = db.blogs.filter(b => b.id !== blogID)
    res.status(204).json()

})


