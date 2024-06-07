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
