import {BlogInputModel} from "../../input-output-types/blogs-types";
import {BlogsDbType} from "../../db/dbType/blog-db-type";
import {blogCollection} from "../../db/mongo-db";

const findViewBlogOptions = {
    projection: {
        _id: 0,
        id: 1,
        name: 1,
        description: 1,
        websiteUrl: 1,
        createdAt: 1,
        isMembership: 1
    }
};

export const blogsRepository = {
    //get
    async getAll(): Promise<BlogsDbType[]> {
        return await blogCollection.find({}, findViewBlogOptions).toArray()
    },

    //post
    async create(blog: BlogInputModel): Promise<BlogsDbType> {
        const newBlog: BlogsDbType = {
            id: new Date().toISOString() + Math.random(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const result = await blogCollection.insertOne(newBlog, {forceServerObjectId: true})
        return newBlog
    },

    //getById
    async findBlogById(blogId: string): Promise<BlogsDbType | null> {
        let blog = await blogCollection.findOne({id: blogId}, findViewBlogOptions)
        if (blog) {
            return blog
        } else {
            return null
        }
    },

    // put
    async updateBlog(blogId: string, blog: BlogInputModel): Promise<boolean> {
        const result = await blogCollection.updateOne({id: blogId},
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
        const result = await blogCollection.deleteOne({id: blogId})
        return result.deletedCount === 1
    },

    async deleteALL() {
        const result = await blogCollection.drop()
        return result
    },
}