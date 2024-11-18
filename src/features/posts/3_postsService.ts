import {postsRepository} from "./repsitory/postsRepository";
import {blogsMongoRepository} from "../blogs/repository/blogsMongoRepository";
import {Result} from "../../utilities/resultError/resultType";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {usersMongoRepository} from "../users/repository/usersMongoRepository";
import {commentsRepository} from "../comments/repository/commentsRepository";
import {PostInputByBlogModel, PostInputModel} from "./post-type";


export const postsService = {
    async findPost(postId: string): Promise<Result<string | null>> {
        const existingPost = await postsRepository.findPostById(postId)

        if (!existingPost) {
            return {
                status: ResultStatus.NotFound,
                errorsMessages: [{field: 'postId', message: 'Post not found'}],
            }
        }

        return {status: ResultStatus.Success}
    },

    async createPost(postInput: PostInputModel): Promise<string | null> {
        const blog = await blogsMongoRepository.findBlogById(postInput.blogId)
        if (!blog) return null
        const newPost = {
            title: postInput.title,
            shortDescription: postInput.shortDescription,
            content: postInput.content,
            blogId: postInput.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }
        return await postsRepository.createPost(newPost)
    },

    async createPostByBlogId(blogId: string, postInput: PostInputByBlogModel): Promise<string | null> {
        const blog = await blogsMongoRepository.findBlogById(blogId)
        if (!blog) return null
        const newPostByBlog = {
            title: postInput.title,
            shortDescription: postInput.shortDescription,
            content: postInput.content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }
        return postsRepository.createPost(newPostByBlog)
    },

    async createComment(postId: string, content: string, userId: string): Promise<Result<string | null>> {
        const existingPost = await postsRepository.findPostById(postId)

        if (!existingPost) {
            return {
                status: ResultStatus.NotFound,
                errorsMessages: [{field: 'postId', message: 'Post not found'}],
            }
        }

        const user = await usersMongoRepository.findById(userId)

        if (!user) {
            return {
                status: ResultStatus.NotFound,
                errorsMessages: [{field: 'userId', message: 'User not found'}],
            }
        }

        const newComment = {
            postId: postId,
            content: content,
            commentatorInfo: {userId: user._id.toString(), userLogin: user.login},
            createdAt: new Date().toISOString(),
        }

        const commentId = await commentsRepository.create(newComment)

        return {status: ResultStatus.Created, data: commentId}
    },

    async updatePost(postId: string, post: PostInputModel): Promise<boolean> {
        return await postsRepository.updatePost(postId, post)
    },

    async deletePost(postId: string): Promise<boolean> {
        return await postsRepository.deletePost(postId)
    },

    async deleteALLPosts(): Promise<boolean> {
        return await postsRepository.deleteALLPosts()
    },

}