import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {BlogsDbType} from "../../db/blog-db-type";
import {db} from "../../db/db";

export const blogsRepository = {
    //get
    getAll(): BlogsDbType[] {
        return db.blogs
    },

    //post
    create(blog: BlogInputModel) {
        const {name, description, websiteUrl} = blog
        //newBlog в единственном числе так как создаем 1 блог.
        const newBlog: BlogsDbType = {
            id: Date.now() + Math.random().toString(),
            name,
            description,
            websiteUrl
        }
        //добавляем в базу данных newBlog
        db.blogs.push(newBlog)
        return newBlog
    },

    //getById
    findBlogID(blogID: string) {
        let blog: BlogViewModel | undefined = db.blogs.find(b => b.id === blogID)
        return blog
    },

    // put
    updateBlog(blogID: string, blog: BlogInputModel) {

        let newBlog: BlogViewModel | undefined = db.blogs.find(b => b.id === blogID)

        const {name, description, websiteUrl} = blog

        if (newBlog) {
            newBlog.name = name
            newBlog.description = description
            newBlog.websiteUrl = websiteUrl
            return true
        } else {
            return false
        }
    },
    //delete
    deleteBlog(blogID: string) {
        const blog = db.blogs.find(b => b.id === blogID)
        if (blog) {
            db.blogs = db.blogs.filter(b => b.id !== blogID)
            return true
        } else {
            return false
        }
    },
}