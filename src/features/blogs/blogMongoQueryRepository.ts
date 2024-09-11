import {WithId} from "mongodb";
import {BlogsDbType} from "./blog-type";
import {BlogViewModel} from "../../input-output-types/blogs-types";
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


export const blogMongoQueryRepository = {
    async mapAndFindBlogById(blogId: string): Promise<BlogViewModel | null> {
        const blog = await blogsRepository.findBlogById(blogId)
        if (blog) {
            return mapBlogToView(blog)
        } else {
            return null
        }
    },

    async mapAndGetAll(): Promise<BlogViewModel[] | null> {
        const blog = await blogsRepository.getAll()
        if (blog) {
            return blog.map(mapBlogToView)
        } else {
            return null
        }
    }
}