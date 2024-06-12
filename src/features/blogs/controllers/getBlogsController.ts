import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {db} from "../../../db/db";

export const getBlogsController = (
    req: Request,
    res: Response<BlogViewModel[]>) => {
    res.status(200).json(db.blogs)
}