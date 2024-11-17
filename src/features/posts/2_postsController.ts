import {Request, Response} from "express";
import {PostInputModel, PostViewModel} from "../../utilities/types/post-types";
import {postsQueryRepository} from "./repsitory/postsQueryRepository";
import {Paginator, SortingQueryField} from "../../utilities/paginationAndSorting/paginator-type";
import {postsService} from "./3_postsService";
import {CommentInputModel, CommentViewModel} from "../comments/commentModel";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {ErrorMessage} from "../../utilities/resultError/resultType";
import {commentsQueryRepository} from "../comments/repository/commentsQueryRepository";
import {PostId} from "./post-type";

export const postsController = {
    async getAllPosts(
        req: Request<any, any, any, SortingQueryField>,
        res: Response<Paginator<PostViewModel[]> | null>) {
        const posts = await postsQueryRepository.getAllPosts(req.query)
        return res.status(200).json(posts)
    },

    async getPostById(
        req: Request<PostId>,
        res: Response<PostViewModel | null>,) {
        const post = await postsQueryRepository.findPostById(req.params.postId)
        if (!post) return res.status(404).json()
        return res.status(200).json(post)
    },

    async getComments(
        req: Request<PostId, any, any, SortingQueryField>,
        res: Response<Paginator<CommentViewModel[]> | ErrorMessage>) {
        const {postId} = req.params
        const existsPost = await postsService.findPost(postId)
        if(existsPost.status === ResultStatus.NotFound) return res.status(404).json(existsPost.errorsMessages)

        const comments = await commentsQueryRepository.findComments(req.query, postId)
        return res.status(200).json(comments)

    },

    async createPost(
        req: Request<any, any, PostInputModel>,
        res: Response<PostViewModel | null>,) {
        const newPosts = await postsService.createPost(req.body)
        if (!newPosts) return res.status(400).json()
        const mapPost = await postsQueryRepository.findPostById(newPosts)
        return res.status(201).json(mapPost)
    },

    async createComment(
        req: Request<{ postId: string }, any, CommentInputModel>,
        res: Response<CommentViewModel | ErrorMessage>,
    ) {
        const {postId} = req.params
        const userId = req?.user?.id as string;
        const {content} = req.body

        const commentId = await postsService.createComment(postId, content, userId)

        const {status, errorsMessages, data} = commentId
        if (status === ResultStatus.NotFound) {
            res.status(404).json(errorsMessages)
            return
        }

        const commentDTO = await commentsQueryRepository.findComment(data!)
        return res.status(201).json(commentDTO!)
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





