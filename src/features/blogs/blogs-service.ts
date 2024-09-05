import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {BlogsDbType} from "./blog-type";
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {blogsRepository} from "./blogsMongoRepository";


export const mapBlogToView = (blog: WithId<BlogsDbType>): BlogViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}

export const blogsService = {
    async getAll(): Promise<WithId<BlogsDbType>[]> {
        return blogsRepository.getAll()
    },

    async create(blog: BlogInputModel): Promise<BlogViewModel | undefined> {
        const newBlog = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const  createBlog = await blogsRepository.create(newBlog)
        if (createBlog.acknowledged && createBlog.insertedId) {
            return {
                id: createBlog.insertedId.toString(),//тип id: ObjectId нежно перевести в string.
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt,
                isMembership: newBlog.isMembership,
            }
        } else {
            return undefined
        }
    },


    async findBlogById(blogId: string): Promise<WithId<BlogsDbType> | null> {
        return blogsRepository.findBlogById(blogId)
    },

    async updateBlog(blogId: string, blog: BlogInputModel): Promise<boolean> {
        return await blogsRepository.updateBlog(blogId, blog)
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

    //delete
    async deleteBlog(blogId: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(blogId)
    },

    async deleteALL(): Promise<boolean> {
       return await blogsRepository.deleteALL()
    },

    async mapAndFindBlogById(blogId: string): Promise<BlogViewModel | null> {
        const blog = await this.findBlogById(blogId)
        if (blog) {
            return mapBlogToView(blog)
        } else {
            return null
        }
    },

    async mapAndGetAll(): Promise<BlogViewModel[] | null> {
        const blog = await this.getAll()
        if (blog) {
            return blog.map(mapBlogToView)
        } else {
            return null
        }
    }
}

