import {Request, Response} from "express";
import {BlogInputModel} from "../../../input-output-types/blogs-types";
import {blogsRepository} from "../blogsRepository";

export const putBlogController = (
    req: Request<{ blogId: string }, any, BlogInputModel>,
    res: Response
) => {

    const isUpdated = blogsRepository.updateBlog(req.params.blogId, req.body)
    if (!isUpdated) {
        res.status(404).json()
    } else {
        const blog = blogsRepository.findBlogById(req.params.blogId)
        res.status(204).json(blog)
    }

    // let blogID: string = req.params.blogId
    // let blog: BlogViewModel | undefined = db.blogs.find(b => b.id === blogID)
    // if (!blog) {
    //     res.status(404).json()
    //     return
    // }
    //
    // const {name, description, websiteUrl} = req.body
    //
    // if (blog) {
    //     blog.name = name
    //     blog.description = description
    //     blog.websiteUrl = websiteUrl
    // }
    // res.status(204).json(blog)
}