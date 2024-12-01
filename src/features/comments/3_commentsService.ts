import {Result} from "../../utilities/resultError/resultType";
import {CommentInputModel} from "./commentModel";
import {commentsRepository} from "./repository/commentsRepository";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {commentsController} from "./2_commentsController";


export const commentsService = {
    async updateComment(userId: string, commentId: string, content: string): Promise<Result<string | boolean>> {
        const existingComment = await commentsRepository.findComment(commentId);
        if (!existingComment) {
            return {
                status: ResultStatus.NotFound,
                errorsMessages: [{
                    message: 'comment not found',
                    field: 'commentId',
                }]
            }
        }

        if (existingComment.commentatorInfo.userId !== userId) {
            return {
                status: ResultStatus.Forbidden,
                errorsMessages: [{
                    message: 'The comment does not belong to this user',
                    field: 'commentatorInfo.userId'
                }]
            }
        }

        const updateComment = await commentsRepository.update(commentId, content)

        return {
            status: ResultStatus.NoContent,
            data: updateComment
        }
    },

    async delete(userId: string, commentId: string): Promise<Result<string | boolean>> {
        const existingComment = await commentsRepository.findComment(commentId);
        if (!existingComment) {
            return {
                status: ResultStatus.NotFound,
                errorsMessages: [{
                    message: 'comment not found',
                    field: 'commentId',
                }]
            }
        }

        if (existingComment.commentatorInfo.userId !== userId) {
            return {
                status: ResultStatus.Forbidden,
                errorsMessages: [{
                    message: 'The comment does not belong to this user',
                    field: 'commentatorInfo.userId'
                }]
            }
        }

        const isDelete = await commentsRepository.delete(commentId)

        return {
            status: ResultStatus.NoContent,
            data: isDelete
        }
    },
}