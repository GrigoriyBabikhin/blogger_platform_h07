import {PostsDbType} from "../../db/dbType/post-db-type";
import {PostInputModel,} from "../../input-output-types/post-types";
import {postCollection} from "../../db/mongo-db";

const findViewPostOptions = {
    projection: {
        _id: 0,
        id: 1,
        title: 1,
        shortDescription: 1,
        content: 1,
        blogId: 1,
        blogName: 1,
        createdAt: 1,
    }
}
export const postsRepository = {
    async getAll(): Promise<PostsDbType[]> {
         const result =  await postCollection.find({}, findViewPostOptions).toArray()
        return result as PostsDbType[]//приведение типа для явного указания, что result является массивом объектов типа PostsDbType
    },
    async create(posts: PostInputModel): Promise<PostsDbType> {
        const newPost: PostsDbType = {
            id: new Date().toISOString() + Math.random(),
            title: posts.title,
            shortDescription: posts.shortDescription,
            content: posts.content,
            blogId: posts.blogId,
            blogName: "string",
            createdAt: new Date().toISOString(),
        }
        const result = await postCollection.insertOne(newPost, {forceServerObjectId: true})
        return newPost
    },

    async findPostById(postId: string): Promise<PostsDbType | null> {
        let post = await postCollection.findOne({id: postId}, findViewPostOptions)
        if (post) {
            return post
        } else {
            return null
        }
    },

    async updatePost(postId: string, post: PostInputModel): Promise<boolean> {

        const result = await postCollection.updateOne({id: postId},
            {
                $set: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId
                }
            })

        return result.matchedCount === 1
    },

    async deletePost(postId: string): Promise<boolean> {
        const result = await postCollection.deleteOne({id: postId})
        return result.deletedCount === 1
    },

    async deleteALL() {
        const result = await postCollection.drop()
        return result
    },
}