import {PostsDbType} from "../../db/post-db-type";
import {db} from "../../db/db";
import {PostInputModel, PostViewModel} from "../../input-output-types/post-types";
import {BlogInputModel} from "../../input-output-types/blogs-types";

export const postsRepository = {
    getAll(): PostsDbType[] {
        return db.posts
    },

    create(posts: PostInputModel) {
        const {title, shortDescription, content, blogId} = posts
        const newPost: PostsDbType = {
            id: Date.now() + Math.random().toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: "string"
        }
        db.posts.push(newPost)
        return newPost
    },

    findPostID(postId: string) {
        const post: PostViewModel | undefined = db.posts.find(p => p.id === postId)
        return post
    },

    updatePost(postId: string, post: PostInputModel) {

        const newPost: PostsDbType | undefined = db.posts.find(p => p.id === postId)

        const {title, shortDescription, content, blogId} = post

        if (newPost) {
            newPost.title = title
            newPost.shortDescription = shortDescription
            newPost.content = content
            newPost.blogId = blogId
            return true
        } else {
            return false
        }
    },

    deletePost(postId: string){

        const post: PostsDbType | undefined = db.posts.find(p => p.id === postId)
        if (post) {
            db.posts = db.posts.filter(p => p.id !== postId)
            return true
        } else {
            return false
        }

    }

}