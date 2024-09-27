import {PostInputByBlogModel, PostInputModel} from "../../input-output-types/post-types";
import {postsMongoRepository} from "./repsitory/postsMongoRepository";
import {blogsMongoRepository} from "../blogs/repository/blogsMongoRepository";

export const postsService = {

    async createPost(postInput: PostInputModel): Promise<string | null> {
        const blog = await blogsMongoRepository.findBlogById(postInput.blogId)
        if(!blog) return null
        const newPost = {
            title: postInput.title,
            shortDescription: postInput.shortDescription,
            content: postInput.content,
            blogId: postInput.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }
        return await postsMongoRepository.createPost(newPost)
    },

    async createPostByBlogId(blogId: string, postInput: PostInputByBlogModel): Promise<string | null>{
        const blog = await blogsMongoRepository.findBlogById(blogId)
        if(!blog) return null
        const newPostByBlog = {
            title: postInput.title,
            shortDescription: postInput.shortDescription,
            content: postInput.content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }
        return postsMongoRepository.createPost(newPostByBlog)
    },

    async updatePost(postId: string, post: PostInputModel): Promise<boolean> {
        return await postsMongoRepository.updatePost(postId, post)
    },

    async deletePost(postId: string): Promise<boolean> {
        return await postsMongoRepository.deletePost(postId)
    },

    async deleteALLPosts(): Promise<boolean> {
        return await postsMongoRepository.deleteALLPosts()
    },

}