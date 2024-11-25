import {CommentDbModel, CommentInputModel} from "../commentModel";
import {commentCollection} from "../../../db/mongo-db";
import {ObjectId} from "mongodb";

export const commentsRepository = {
    async create(newComment: CommentDbModel) {
        const comment = await commentCollection.insertOne(newComment)
        return comment.insertedId ? comment.insertedId.toString() : null
    },

    async findComment(commentId: string) {
        const comment = await commentCollection.findOne({_id: new ObjectId(commentId)})
        return comment ? comment : null
    },

    async updateComment(commentId: string, content: CommentInputModel): Promise<boolean> {
        debugger
        const result = await commentCollection.updateOne({_id: new ObjectId(commentId)},
            {
                $set: {
                    content: content.toString(),
                }
            })
        return result.matchedCount === 1
    }

}