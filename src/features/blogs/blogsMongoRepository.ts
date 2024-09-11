import {BlogInputModel} from "../../input-output-types/blogs-types";
import {BlogsDbType} from "./blog-type";
import {blogCollection} from "../../db/mongo-db";
import {InsertOneResult, ObjectId, WithId} from "mongodb";

// export const mapBlogToView = (blog: WithId<BlogsDbType>): BlogViewModel => {
//     return {
//         id: blog._id.toString(),
//         name: blog.name,
//         description: blog.description,
//         websiteUrl: blog.websiteUrl,
//         createdAt: blog.createdAt,
//         isMembership: blog.isMembership
//     }
// }

export const blogsRepository = {
    //get
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

    //post
    async create(newBlog: BlogsDbType): Promise<InsertOneResult<BlogsDbType>> {
        const createBlog = await blogCollection.insertOne(newBlog)
        return createBlog
    },

    // put
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

    //delete
    async deleteBlog(blogId: string): Promise<boolean> {
        const result = await blogCollection.deleteOne({_id: new ObjectId(blogId)})
        return result.deletedCount === 1
    },

    async deleteALL(): Promise<boolean> {
        const result = await blogCollection.drop()
        return result
    },

    // async mapAndFindBlogById(blogId: string): Promise<BlogViewModel | null> {
    //     const blog = await this.findBlogById(blogId)
    //     if (blog) {
    //         return mapBlogToView(blog)
    //     } else {
    //         return null
    //     }
    // },

    // async mapAndGetAll(): Promise<BlogViewModel[] | null> {
    //     const blog = await this.getAll()
    //     if (blog) {
    //         return blog.map(mapBlogToView)
    //     } else {
    //         return null
    //     }
    // }
}

