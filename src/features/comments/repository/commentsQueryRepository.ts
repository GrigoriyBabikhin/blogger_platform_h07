import {ObjectId, WithId} from "mongodb";
import {CommentDbModel, CommentViewModel} from "../commentModel";
import {commentCollection, userCollection} from "../../../db/mongo-db";
import {Paginator, SortingQueryField} from "../../../utilities/paginationAndSorting/paginator-type";
import {getPaginationAndSortOptions} from "../../../utilities/paginationAndSorting/paginationAndSorting";

export const commentsQueryRepository = {
    async findComment(commentId: string): Promise<CommentViewModel | null> {
        if (!this._checkObjectId(commentId)) return null

        let comment = await commentCollection.findOne({_id: new ObjectId(commentId)})
        return comment ? this._commentsDTO(comment) : null
    },

    async findComments(query: SortingQueryField, postId: string): Promise<Paginator<CommentViewModel[]>> {
        const processedQuery = getPaginationAndSortOptions(query);
        const filter = {postId: postId}
        const comments = await commentCollection
            .find(filter)
            .sort(processedQuery.sortBy, processedQuery.sortDirection)
            .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
            .limit(processedQuery.pageSize)
            .toArray()
        const totalCount = await commentCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / processedQuery.pageSize)
        return {
            'pagesCount': pagesCount,
            'page': processedQuery.pageNumber,
            'pageSize': processedQuery.pageSize,
            'totalCount': totalCount,
            'items': comments.map(c => this._commentsDTO(c))
        }
    },

    _commentsDTO(comments: WithId<CommentDbModel>): CommentViewModel {
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