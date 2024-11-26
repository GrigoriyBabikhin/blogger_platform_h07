import {commentsQueryRepository} from "./repository/commentsQueryRepository";
import {Request, Response} from "express";
import {CommentIdModel, CommentInputModel, CommentViewModel} from "./commentModel";
import {commentsService} from "./3_commentsService";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {ErrorMessage} from "../../utilities/resultError/resultType";

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
        req: Request<CommentIdModel, any, CommentInputModel>,
        res: Response<ErrorMessage>,
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

    async deleteComment(
        req: Request<CommentIdModel>,
        res: Response<ErrorMessage>
    ) {
        const userId = req?.user?.id as string
        const {commentId} = req.params

        const isDelete = await commentsService.delete(userId, commentId)
        const {status, errorsMessages, data} = isDelete
        if (status === ResultStatus.NotFound) return res.status(404).json(errorsMessages)
        if (status === ResultStatus.Forbidden) return res.status(403).json(errorsMessages)
        return res.status(204).json()
    },


}