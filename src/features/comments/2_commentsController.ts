import {commentsQueryRepository} from "./repository/commentsQueryRepository";
import {Request, Response} from "express";
import {CommentIdModel, CommentViewModel} from "./commentModel";
import {commentsService} from "./3_commentsService";
import {ResultStatus} from "../../utilities/resultError/resultStatus";

export const commentsController = {
    async getComment(
        req: Request<CommentIdModel>,
        res: Response<CommentViewModel>,
    ) {
        const comment = await commentsQueryRepository.findComment(req.params.commentId)
        if (!comment) return res.status(404).json()
        return res.status(200).json(comment)
    },
    async updateComment(
        req: Request,
        res: Response,
    ) {
        const userId = req?.user?.id as string
        const {commentId} = req.params
        const {content} = req.body
        const updateComment = await commentsService.updateComment(userId, commentId, content)
        const {status, errorsMessages} = updateComment
        if (status === ResultStatus.NotFound) {
            return res.status(404).json(errorsMessages)
        }

        if (status === ResultStatus.Forbidden) {
           return res.status(403).json(errorsMessages)
        }

        return res.status(204).json()
    },
}