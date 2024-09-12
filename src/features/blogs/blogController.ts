import {Request, Response} from "express";
import {SortingQueryField} from "../utilities/paginationAndSorting";
import {Paginator} from "../../input-output-types/paginator-type";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {blogMongoQueryRepository} from "./blogMongoQueryRepository";
import {blogsService} from "./blogs-service";
import {blogsRepository} from "./blogsMongoRepository";

export const blogController = {

    async getBlogsController(
        req: Request<any, any, any, SortingQueryField>,
        res: Response<Paginator<BlogViewModel[]> | null>) {

        const blogs = await blogMongoQueryRepository.getAllBlogs(req.query)
        res.status(200).json(blogs)
    },

    async findBlogController(
        req: Request<{ blogId: string }>,
        res: Response<BlogViewModel>) {

        let blog = await blogsRepository.findBlogById(req.params.blogId)
        if (!blog) {
            res.status(404).json()
            return
        }
        res.status(200).json(blog)
        return
    },

     async delBlogController (
        req: Request<{ blogId: string }>,
        res: Response)  {
        const isDeleted = await blogsService.deleteBlog(req.params.blogId)

        if (isDeleted) {
            res.status(204).json()
        } else {
            res.status(404).json()
        }
    },

      async createBlogController (
        req: Request<any, any, BlogInputModel>,
        res: Response<BlogViewModel>)  {
        const newBlog = await blogsService.create(req.body)
        res.status(201).json(newBlog)
    },

    async putBlogController (
        req: Request<{ blogId: string }, any, BlogInputModel>,
        res: Response)  {

        const isUpdated = await blogsService.updateBlog(req.params.blogId, req.body)
        if (!isUpdated) {
            res.status(404).json()
        } else {
            res.status(204).json()
        }
    }


}