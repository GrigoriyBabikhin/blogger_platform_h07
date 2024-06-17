import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {BlogsDbType} from "../../db/blog-db-type";
import {db} from "../../db/db";

export const blogsRepository = {

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
    findBlogID(blogID: string) {
        let blog: BlogViewModel | undefined = db.blogs.find(b => b.id === blogID)
        return blog
    },
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
    deleteBlog(blogID: string) {
        //Ищем блог.
        const blog: BlogsDbType | undefined = db.blogs.find(b => b.id === blogID)
        //Если блог не найден вернуть false
        if (!blog) {
            return false
        }
        //Если блог найден удалить из базы и вернуть true.
        if (blog) {
            db.blogs = db.blogs.filter(b => b.id !== blogID)
        }
        return true

    }

}