import {Request, Response} from "express";
import {db} from "../../db/db";

export const delTestingController = (req: Request, res: Response) => {
    db.blogs.length = 0
    db.posts.length = 0;
    res.status(204).json()
}