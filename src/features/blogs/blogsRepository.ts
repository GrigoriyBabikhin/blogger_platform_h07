import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {BlogsDbType} from "../../db/blog-db-type";
import {db} from "../../db/db";

export const blogsRepository = {
    //get
    getAll(): BlogsDbType[] {
        return db.blogs
    },

    //post
    //(): Type указывает на тип значения, которое возвращает функция.
    create(blog: BlogInputModel): BlogsDbType {
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
    findBlogById(blogId: string): BlogViewModel | undefined {
        return db.blogs.find(b => b.id === blogId)
    },

    // put
    updateBlog(blogId: string, blog: BlogInputModel): boolean {

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
    deleteBlog(blogId: string): boolean {
        const blog = db.blogs.find(b => b.id === blogId)
        if (blog) {
            db.blogs = db.blogs.filter(b => b.id !== blogId)
            return true
        } else {
            return false
        }
    }
}