import {Result} from "../../utilities/resultError/resultType";
import {CommentInputModel} from "./commentModel";
import {commentsRepository} from "./repository/commentsRepository";
import {ResultStatus} from "../../utilities/resultError/resultStatus";


export const commentsService = {
    async updateComment(userId: string, commentId: string, content: CommentInputModel): Promise<Result<string | boolean>> {
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
debugger
        if (existingComment.commentatorInfo.userId !== userId) {
            return {
                status: ResultStatus.Forbidden,
                errorsMessages: [{
                    message: 'The comment does not belong to this user',
                    field: 'commentatorInfo.userId'
                }]
            }
        }

        const updateComment = await commentsRepository.updateComment(commentId, content)

        return {
            status: ResultStatus.NoContent,
            data: updateComment
        }

    }
}