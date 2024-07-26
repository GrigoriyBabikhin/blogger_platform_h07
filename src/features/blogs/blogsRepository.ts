import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {BlogsDbType} from "../../db/dbType/blog-db-type";
import {db} from "../../db/db";

export const blogsRepository = {
    //get
    async getAll(): Promise<BlogsDbType[]> {
        return db.blogs
    },

    //post
    //(): Type указывает на тип значения, которое возвращает функция.
    async create(blog: BlogInputModel): Promise<BlogsDbType> {
        const {name, description, websiteUrl} = blog
        //newBlog в единственном числе так как создаем 1 блог.
        const newBlog: BlogsDbType = {
            id: new Date().toISOString() + Math.random(),
            name,
            description,
            websiteUrl
        }
        //добавляем в базу данных newBlog
        db.blogs.push(newBlog)
        return newBlog
        //    db.blogs = [...db.blogs, newBlog]
        //         return newBlog.id
    },

    //getById
    async findBlogById(blogId: string): Promise<BlogViewModel | undefined> {
        return db.blogs.find(b => b.id === blogId)
    },

    // put
   async updateBlog(blogId: string, blog: BlogInputModel): Promise<boolean> {

        const blogToUpdate = db.blogs.find(b => b.id === blogId)

        const {name, description, websiteUrl} = blog

        if (blogToUpdate) {
            blogToUpdate.name = name
            blogToUpdate.description = description
            blogToUpdate.websiteUrl = websiteUrl
            return true
        } else {
            return false
        }
    },

    //delete
    async deleteBlog(blogId: string): Promise<boolean> {
        const blog = db.blogs.find(b => b.id === blogId)
        if (blog) {
            db.blogs = db.blogs.filter(b => b.id !== blogId)
            return true
        } else {
            return false
        }
    }
}