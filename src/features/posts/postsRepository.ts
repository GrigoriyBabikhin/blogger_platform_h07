import {PostsDbType} from "../../db/post-db-type";
import {db} from "../../db/db";
import {PostInputModel, PostViewModel} from "../../input-output-types/post-types";

export const postsRepository = {
    getAll(): PostsDbType[] {
        return db.posts
    },

    create(posts: PostInputModel): PostsDbType {
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

    findPostById(postId: string): PostViewModel | undefined {
        return db.posts.find(p => p.id === postId)
    },

    updatePost(postId: string, post: PostInputModel): boolean {

        const postToUpdate = db.posts.find(p => p.id === postId)

        const {title, shortDescription, content, blogId} = post

        if (postToUpdate) {
            postToUpdate.title = title
            postToUpdate.shortDescription = shortDescription
            postToUpdate.content = content
            postToUpdate.blogId = blogId
            return true
        } else {
            return false
        }
    },

    deletePost(postId: string): boolean {

        const post: PostsDbType | undefined = db.posts.find(p => p.id === postId)
        if (post) {
            db.posts = db.posts.filter(p => p.id !== postId)
            return true
        } else {
            return false
        }
    }
}