import {ObjectId, WithId} from "mongodb";
import {PostsDbType} from "../post-type";
import {PostViewModel} from "../../../input-output-types/post-types";
import {postCollection} from "../../../db/mongo-db";
import {getPaginationAndSortOptions, SortingQueryField} from "../../../utilities/paginationAndSorting/paginationAndSorting";
import {Paginator} from "../../../utilities/paginationAndSorting/paginator-type";

export const mapPostToView = (posts: WithId<PostsDbType>): PostViewModel => {
    return {
        id: posts._id.toString(),
        title: posts.title,
        shortDescription: posts.shortDescription,
        content: posts.content,
        blogId: posts.blogId,
        blogName: posts.blogName,
        createdAt: posts.createdAt,
    }
}

export const postsMongoQueryRepository = {

    async getAllPosts(query: SortingQueryField, blogId?: string): Promise<Paginator<PostViewModel[]>> {
        const processedQuery = getPaginationAndSortOptions(query)
        const filter = blogId ? {blogId: blogId} : {}
        const allPosts = await postCollection
            .find(filter)
            .sort(processedQuery.sortBy, processedQuery.sortDirection)
            .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
            .limit(processedQuery.pageSize)
            .toArray()
        const totalCount = await postCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / processedQuery.pageSize)
        return {
            'pagesCount': pagesCount,
            'page': processedQuery.pageNumber,
            'pageSize': processedQuery.pageSize,
            'totalCount': totalCount,
            'items': allPosts.map(mapPostToView)
        }
    },

    async findPostById(postId: string): Promise<PostViewModel | null> {
        let post = await postCollection.findOne({_id: new ObjectId(postId)})
        return post ? await mapPostToView(post) : null

    },
}