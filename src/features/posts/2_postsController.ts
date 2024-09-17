import {Request, Response} from "express";
import {PostInputModel, PostViewModel} from "../../input-output-types/post-types";
import {postsRepository} from "./repsitory/postsMongoRepository";
import {SortingQueryField} from "../utilities/paginationAndSorting";
import {postsMongoQueryRepository} from "./repsitory/postsMongoQueryRepository";
import {Paginator} from "../../input-output-types/paginator-type";

export const postsController = {
     async getAllPosts (
        req: Request<any, any, any, SortingQueryField>,
        res: Response<Paginator<PostViewModel[]> | null>)  {
        const posts = await postsMongoQueryRepository.getAllPosts(req.query)
        res.status(200).json(posts)
    },

     async createPost (
        req: Request<any, any, PostInputModel>,
        res: Response<PostViewModel>,)  {
        const newPosts = await postsRepository.create(req.body)
        res.status(201).json(newPosts)
    },

     async getPostById (
        req: Request<{ postId: string }>,
        res: Response<PostViewModel>,)  {
        const post = await postsRepository.mapAndFindPostById(req.params.postId)
        if (!post) {
            res.status(404).json()
            return
        }
        res.status(200).json(post)
        return
    },

     async updatePost (
        req: Request<{ postId: string }, any, PostInputModel>,
        res: Response,)  {
        const isUpdated = await postsRepository.updatePost(req.params.postId, req.body)
        if (!isUpdated) {
            res.status(404).json()
        } else {
            res.status(204).json()
        }
    },

     async deletePost (
        req:Request<{postId: string}>,
        res:Response) {
        const isDeleted = await postsRepository.deletePost(req.params.postId)
        if(isDeleted){
            res.status(204).json()
        } else {
            res.status(404).json()
        }
    },
}





