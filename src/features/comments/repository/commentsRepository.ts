import {CommentDbModel} from "../commentModel";
import {commentCollection} from "../../../db/mongo-db";
import {ObjectId, WithId} from "mongodb";

export const commentsRepository = {
    async create(newComment: CommentDbModel): Promise<string | null> {
        const comment = await commentCollection.insertOne(newComment)
        return comment.insertedId ? comment.insertedId.toString() : null
    },

    async findComment(commentId: string) : Promise<WithId<CommentDbModel> | null> {
        if (!this._checkObjectId(commentId)) return null
        const comment = await commentCollection.findOne({_id: new ObjectId(commentId)})
        return comment ? comment : null
    },

    async update(commentId: string, content: string): Promise<boolean> {
        if (!this._checkObjectId(commentId)) return false
        const result = await commentCollection.updateOne({_id: new ObjectId(commentId)},
            {
                $set: {
                    content: content.toString(),
                }
            })
        return result.matchedCount === 1
    },

    async delete(commentId: string): Promise<boolean> {
        if (!this._checkObjectId(commentId)) return false;
        const isDelete = await commentCollection.deleteOne({_id: new ObjectId(commentId)})
        return isDelete.deletedCount === 1
    },

    _checkObjectId(id: string): boolean {
        return ObjectId.isValid(id)
    },
}