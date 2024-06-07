import express from 'express'
import {Request, Response} from "express";
import {SETTINGS} from "./settings";
import {db} from "./db/db";
import {BlogsDbType} from "./db/db-type";

export const app = express()
app.use(express.json())

app.get(SETTINGS.PATH.BLOGS, (
    req: Request,
    res: Response<BlogsDbType[]>) => {
    res.status(200).json((db.blogs))
})

app.post(SETTINGS.PATH.BLOGS, (
    req: Request,
    res: Response) => {
    const {name, description, websiteUrl} = req.body
    let newBlogs: BlogsDbType = {
        id: Date.now() + Math.random().toString(),
        name,
        description,
        websiteUrl
    }
    db.blogs.push(newBlogs)
    res.status(201).json(newBlogs)
})

