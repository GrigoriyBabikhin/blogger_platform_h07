import {BlogInputModel} from "../../../input-output-types/blogs-types";
import {blogCollection} from "../../../db/mongo-db";
import {ObjectId, WithId} from "mongodb";
import {BlogsDbType} from "../blogs-type";

export const blogsMongoRepository = {

    async findBlogId(blogId: string): Promise<WithId<BlogsDbType> | null> {
        let blog = await blogCollection.findOne({_id: new ObjectId(blogId)})
        return blog ? await blog : null
    },

    async createBlog(blogInput: BlogInputModel): Promise<string | null> {
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
        return await blogCollection.drop()

    },
}

