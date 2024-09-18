import {BlogInputModel} from "../../../input-output-types/blogs-types";
import {blogCollection} from "../../../db/mongo-db";
import {ObjectId} from "mongodb";

export const blogsMongoRepository = {
    async createBlog(blogInput: BlogInputModel): Promise<string | null>{
        const newBlog = {
            name: blogInput.name,
            description: blogInput.description,
            websiteUrl: blogInput.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const createdBlogId = await blogCollection.insertOne(newBlog)
        if (createdBlogId.insertedId && createdBlogId.acknowledged) {
            return createdBlogId.insertedId.toString()
        } else {
            return null
        }
    },

    async updateBlog(blogId: string, blog: BlogInputModel): Promise<boolean> {
        const result = await blogCollection.updateOne({_id: new ObjectId(blogId)},
            {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl
                }
            })
        return result.matchedCount === 1
    },

    async deleteBlog(blogId: string): Promise<boolean> {
        const result = await blogCollection.deleteOne({_id: new ObjectId(blogId)})
        return result.deletedCount === 1
    },

    async deleteALL(): Promise<boolean> {
        const result = await blogCollection.drop()
        return result
    },
}

