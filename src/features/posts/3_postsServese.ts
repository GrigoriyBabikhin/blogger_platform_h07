import {PostInputModel} from "../../input-output-types/post-types";
import {postsMongoRepository} from "./repsitory/postsMongoRepository";

export const postsService = {
    async createPost(postinput: PostInputModel): Promise<string | null> {
        return await postsMongoRepository.createPost(postinput)
    },

    async updatePost(postId: string, post: PostInputModel): Promise<boolean> {
        return await postsMongoRepository.updatePost(postId, post)
    },

    async deletePost(postId: string): Promise<boolean> {
        return await postsMongoRepository.deletePost(postId)
    },

    async deleteALL(): Promise<boolean> {
        return await postsMongoRepository.deleteALL()
    },

}