import {BlogInputModel} from "../../../input-output-types/blogs-types";
import {blogCollection} from "../../../db/mongo-db";
import {ObjectId, WithId} from "mongodb";
import {BlogsDbType} from "../blogs-type";

export const blogsMongoRepository = {

    async findBlogById(blogId: string): Promise<WithId<BlogsDbType> | null> {
        let blog = await blogCollection.findOne({_id: new ObjectId(blogId)})
        return blog ? blog : null
    },

    async createBlog(newBlog: BlogsDbType): Promise<string | null> {
        const createdBlogId = await blogCollection.insertOne(newBlog)
        return createdBlogId.insertedId ? createdBlogId.insertedId.toString() : null
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

    async deleteAllBlogs(): Promise<boolean> {
        return await blogCollection.drop()

    },
}

