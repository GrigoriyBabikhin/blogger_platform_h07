import {ObjectId, WithId} from "mongodb";
import {CommentDBType, CommentViewModel} from "../commentModel";
import {commentCollection} from "../../../db/mongo-db";

export const commentsQueryRepository = {
   async findComment (commentId: string): Promise<CommentViewModel | null> {
       if(!this._checkObjectId(commentId)) return null

       let comment = await commentCollection.findOne({_id: new ObjectId(commentId)})
       return comment ? this._commentsDTO(comment) : null
   },

    _commentsDTO(comments: WithId<CommentDBType>): CommentViewModel {
        return {
            id: comments._id.toString(),
            content: comments.content,
            commentatorInfo: {
                userId: comments.commentatorInfo.userId,
                userLogin: comments.commentatorInfo.userLogin
            },
            createdAt: comments.createdAt
        }
    },

    _checkObjectId(id: string): boolean {
        return ObjectId.isValid(id)
    }
}