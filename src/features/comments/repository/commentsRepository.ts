import {CommentDBType} from "../commentModel";
import {commentCollection} from "../../../db/mongo-db";

export const commentsRepository = {
    async create (newComment: CommentDBType) {
        const comment = await commentCollection.insertOne(newComment)
        return comment.insertedId ? comment.insertedId.toString() : null
    },

}