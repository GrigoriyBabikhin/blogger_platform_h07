import {BlogInputModel} from "../../../input-output-types/blogs-types";
import {BlogsDbType} from "../blogs-type";
import {blogCollection} from "../../../db/mongo-db";
import {ObjectId, WithId} from "mongodb";

export const blogsMongoRepository = {
    async getAll(): Promise<WithId<BlogsDbType>[]> {
        return await blogCollection.find({}).toArray()
    },

    async findBlogById(blogId: string): Promise<WithId<BlogsDbType> | null> {
        let blog = await blogCollection.findOne({_id: new ObjectId(blogId)})
        if (blog) {
            return blog
        } else {
            return null
        }
    },

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
        console.log('result.acknowledged - ',result.acknowledged)
        console.log('result.deletedCount - ',result.deletedCount)
        return result.deletedCount === 1
    },

    async deleteALL(): Promise<boolean> {
        const result = await blogCollection.drop()
        return result
    },
}

