import {PostInputModel} from "../../../input-output-types/post-types";
import {postCollection} from "../../../db/mongo-db";
import {ObjectId} from "mongodb";

export const postsMongoRepository = {

    async createPost(postsInput: PostInputModel): Promise<string | null> {
        const newPost = {
            title: postsInput.title,
            shortDescription: postsInput.shortDescription,
            content: postsInput.content,
            blogId: postsInput.blogId,
            blogName: "string",
            createdAt: new Date().toISOString(),
        }
        const createdPostId = await postCollection.insertOne(newPost)
        return createdPostId.insertedId ? createdPostId.insertedId.toString() : null
    },

    async updatePost(postId: string, post: PostInputModel): Promise<boolean> {
        const result = await postCollection.updateOne({_id: new ObjectId(postId)},
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
        const result = await postCollection.deleteOne({_id: new ObjectId(postId)})
        return result.deletedCount === 1
    },

    async deleteALL() {
        return await postCollection.drop()
    },
}
