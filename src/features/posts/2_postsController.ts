import {Request, Response} from "express";
import {PostInputModel, PostViewModel} from "../../input-output-types/post-types";
import {SortingQueryField} from "../../utilities/paginationAndSorting/paginationAndSorting";
import {postsMongoQueryRepository} from "./repsitory/postsMongoQueryRepository";
import {Paginator} from "../../utilities/paginationAndSorting/paginator-type";
import {postsService} from "./3_postsServese";

export const postsController = {
    async getAllPosts(
        req: Request<any, any, any, SortingQueryField>,
        res: Response<Paginator<PostViewModel[]> | null>) {
        const posts = await postsMongoQueryRepository.getAllPosts(req.query)
        return res.status(200).json(posts)
    },

    async createPost(
        req: Request<any, any, PostInputModel>,
        res: Response<PostViewModel | null>,) {
        const newPosts = await postsService.createPost(req.body)
        if (!newPosts) return res.status(400).json()
        const mapPost = await postsMongoQueryRepository.findPostById(newPosts)
        return res.status(201).json(mapPost)
    },

    async getPostById(
        req: Request<{ postId: string }>,
        res: Response<PostViewModel | null>,) {
        const post = await postsMongoQueryRepository.findPostById(req.params.postId)
        if (!post) return res.status(404).json()
        return res.status(200).json(post)
    },

    async updatePost(
        req: Request<{ postId: string }, any, PostInputModel>,
        res: Response,) {
        const isUpdated = await postsService.updatePost(req.params.postId, req.body)
        if (!isUpdated) return res.status(404).json()
        return res.status(204).json()
    },

    async deletePost(
        req: Request<{ postId: string }>,
        res: Response) {
        const isDeleted = await postsService.deletePost(req.params.postId)
        if (isDeleted) return res.status(204).json()
        return res.status(404).json()
    },
}





