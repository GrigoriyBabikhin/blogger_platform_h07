import {Request, Response} from "express";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {blogsService} from "../blogs-service";
import {blogMongoQueryRepository} from "../blogMongoQueryRepository";

export const findBlogController = async (
    req: Request<{ blogId: string }>,
    res: Response<BlogViewModel>
) => {
    let blog = await blogMongoQueryRepository.mapAndFindBlogById(req.params.blogId)
    if (!blog) {
        res.status(404).json()
        return
    }
    res.status(200).json(blog)
    return
}