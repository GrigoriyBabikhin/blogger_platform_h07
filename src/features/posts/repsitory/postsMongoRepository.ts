import {PostInputModel} from "../../../utilities/input-output-types/post-types";
import {postCollection} from "../../../db/mongo-db";
import {ObjectId} from "mongodb";
import {PostsDbType} from "../post-type";

export const postsMongoRepository = {

    async createPost(newPost: PostsDbType): Promise<string | null> {
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

    async deleteALLPosts() {
        return await postCollection.drop()
    },
}
