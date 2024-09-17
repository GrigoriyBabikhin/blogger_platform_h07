import {ObjectId, WithId} from "mongodb";
import {PostsDbType} from "../post-type";
import {PostInputModel, PostViewModel} from "../../../input-output-types/post-types";
import {postCollection} from "../../../db/mongo-db";
import {blogMongoQueryRepository, mapBlogToView} from "../../blogs/repository/blogMongoQueryRepository";
import {getPaginationAndSortOptions, SortingQueryField} from "../../utilities/paginationAndSorting";
import {Paginator} from "../../../input-output-types/paginator-type";

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

    async getAllPosts(query: SortingQueryField): Promise<Paginator<PostViewModel[]>> {
        const processedQuery = getPaginationAndSortOptions(query)
        const filter = {}
        const allPosts = await postCollection
            .find(filter)
            .sort(processedQuery.sortBy, processedQuery.sortDirection)
            .skip((processedQuery.pageNumber -1) * processedQuery.pageSize)
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

    // async create(posts: PostInputModel): Promise<PostViewModel | undefined> {
    //     const newPost = {
    //         title: posts.title,
    //         shortDescription: posts.shortDescription,
    //         content: posts.content,
    //         blogId: posts.blogId,
    //         blogName: "string",
    //         createdAt: new Date().toISOString(),
    //     }
    //     const result = await postCollection.insertOne(newPost)
    //     //console.log(result.acknowledged, result.insertedId)
    //     if (result.acknowledged && result.insertedId) {
    //         return {
    //             id: result.insertedId.toString(),
    //             title: newPost.title,
    //             shortDescription: newPost.shortDescription,
    //             content: newPost.content,
    //             blogId: newPost.blogId,
    //             blogName: newPost.blogName,
    //             createdAt: newPost.createdAt,
    //         }
    //     } else {
    //         return undefined
    //     }
    // },
    //
    // async findPostById(postId: string): Promise<WithId<PostsDbType> | null> {
    //     let post = await postCollection.findOne({_id: new ObjectId(postId)})
    //     if (post) {
    //         return post
    //     } else {
    //         return null
    //     }
    // },
    //
    // async updatePost(postId: string, post: PostInputModel): Promise<boolean> {
    //     const result = await postCollection.updateOne({_id: new ObjectId(postId)},
    //         {
    //             $set: {
    //                 title: post.title,
    //                 shortDescription: post.shortDescription,
    //                 content: post.content,
    //                 blogId: post.blogId
    //             }
    //         })
    //
    //     return result.matchedCount === 1
    // },
    //
    // async deletePost(postId: string): Promise<boolean> {
    //     const result = await postCollection.deleteOne({_id: new ObjectId(postId)})
    //     return result.deletedCount === 1
    // },
    //
    // async deleteALL() {
    //     const result = await postCollection.drop()
    //     return result
    // },
    //
    // async mapAndFindPostById(postId: string): Promise<PostViewModel | null> {
    //     const post = await this.findPostById(postId)
    //     if (post) {
    //         return mapPostToView(post)
    //     } else {
    //         return null
    //     }
    // },
    //
    // async mapAndGetAll(): Promise<PostViewModel[] | null> {
    //     const post = await this.getAllPosts()
    //     if (post) {
    //         return post.map(mapPostToView)
    //     } else {
    //         return null
    //     }
    // }
}