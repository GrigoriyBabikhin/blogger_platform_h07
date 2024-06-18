import {Request, Response} from "express";
import {PostsDbType} from "../../../db/post-db-type";
import {db} from "../../../db/db";
import {postsRepository} from "../postsRepository";

export const delPostController = (
    req:Request<{postId: string}>,
    res:Response,)=>{

    const isDeleted = postsRepository.deletePost(req.params.postId)

    if(isDeleted){
        res.status(204).json()
    } else {
        res.status(404).json()
    }

    // const postId: string = req.params.postId
    // const post: PostsDbType | undefined = db.posts.find(p => p.id === postId)
    // if (!post) {
    //     res.status(404).json()
    //     return
    // }
    // db.posts = db.posts.filter(p => p.id !== postId)
    // res.status(204).json()
}