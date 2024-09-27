import {BlogInputModel} from "../../input-output-types/blogs-types";
import {blogsMongoRepository} from "./repository/blogsMongoRepository";

export const blogsService = {

    async createBlog(blogInput: BlogInputModel): Promise<string | null> {
        const newBlog = {
            name: blogInput.name,
            description: blogInput.description,
            websiteUrl: blogInput.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return blogsMongoRepository.createBlog(newBlog)
    },

    async updateBlog(blogId: string, blog: BlogInputModel): Promise<boolean> {
        return blogsMongoRepository.updateBlog(blogId, blog)
    },

    async deleteBlog(blogId: string): Promise<boolean> {
        return blogsMongoRepository.deleteBlog(blogId)
    },

    async deleteAllBlogs(): Promise<boolean> {
        return blogsMongoRepository.deleteAllBlogs()
    },
}

