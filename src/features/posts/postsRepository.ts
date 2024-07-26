import {PostsDbType} from "../../db/dbType/post-db-type";
import {db} from "../../db/db";
import {PostInputModel, PostViewModel} from "../../input-output-types/post-types";

export const postsRepository = {
    async getAll(): Promise<PostsDbType[]> {
        return db.posts
    },

    async create(posts: PostInputModel): Promise<PostsDbType> {
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

    async findPostById(postId: string): Promise<PostViewModel | undefined> {
        return db.posts.find(p => p.id === postId)
    },

    async updatePost(postId: string, post: PostInputModel): Promise<boolean> {

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

    async deletePost(postId: string): Promise<boolean> {

        const post: PostsDbType | undefined = db.posts.find(p => p.id === postId)
        if (post) {
            db.posts = db.posts.filter(p => p.id !== postId)
            return true
        } else {
            return false
        }
    }
}