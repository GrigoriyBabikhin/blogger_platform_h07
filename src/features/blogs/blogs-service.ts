import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {BlogsDbType} from "./blogs-type";
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {blogsMongoRepository} from "./blogsMongoRepository";


export const blogsService = {
    async getAll(): Promise<WithId<BlogsDbType>[]> {
        return blogsMongoRepository.getAll()
    },

    async createBlog(blogInput: BlogInputModel): Promise<string | null> {
        return await blogsMongoRepository.createBlog(blogInput)
    },

    async findBlogById(blogId: string): Promise<WithId<BlogsDbType> | null> {
        return blogsMongoRepository.findBlogById(blogId)
    },

    async updateBlog(blogId: string, blog: BlogInputModel): Promise<boolean> {
        return await blogsMongoRepository.updateBlog(blogId, blog)
        // {
        //     $set: {
        //         name: blog.name,
        //         description: blog.description,
        //         websiteUrl: blog.websiteUrl
        //     }
        // })
        //
        // return result.matchedCount === 1
    },

    async deleteBlog(blogId: string): Promise<boolean> {
        return await blogsMongoRepository.deleteBlog(blogId)
    },

    async deleteALL(): Promise<boolean> {
        return await blogsMongoRepository.deleteALL()
    },


}

