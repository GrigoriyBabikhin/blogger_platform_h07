import {Request, Response} from "express";
import {SortingQueryField} from "../utilities/paginationAndSorting";
import {Paginator} from "../../input-output-types/paginator-type";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {blogMongoQueryRepository} from "./blogMongoQueryRepository";
import {blogsService} from "./blogs-service";


export const blogsController = {
    async getAllBlogs(
        req: Request<any, any, any, SortingQueryField>,
        res: Response<Paginator<BlogViewModel[]> | null>) {
        const blogs = await blogMongoQueryRepository.getAllBlogs(req.query)
        res.status(200).json(blogs)
    },

    async createBlog(
        req: Request<any, any, BlogInputModel>,
        res: Response<BlogViewModel | null>) {
        const createdBlog = await blogsService.createBlog(req.body)
        if (createdBlog === null) {
            return res.status(404).json()
        }
        const mapBlog = await blogMongoQueryRepository.findBlogId(createdBlog)
        return res.status(201).json(mapBlog)
    },

    async getBlogById(
        req: Request<{ blogId: string }>,
        res: Response<BlogViewModel | null>) {
        let blog = await blogMongoQueryRepository.findBlogId(req.params.blogId)
        if (blog === null) {
            return res.status(404).json()
        }
        return res.status(200).json(blog)
    },

    async updateBlog(
        req: Request<{ blogId: string }, any, BlogInputModel>,
        res: Response) {
        const isUpdated = await blogsService.updateBlog(req.params.blogId, req.body)
        if (!isUpdated) {
            res.status(404).json()
        } else {
            res.status(204).json()
        }
    },

    async deleteBlog(
        req: Request<{ blogId: string }>,
        res: Response) {
        const isDeleted = await blogsService.deleteBlog(req.params.blogId)
        if (isDeleted) {
            return res.status(204).json()
        } else {
            return res.status(404).json()
        }
    },
}