import {Request, Response} from "express";
import {postsRepository} from "../postsRepository";

export const delPostController = async (
    req:Request<{postId: string}>,
    res:Response,)=>{

    const isDeleted = await postsRepository.deletePost(req.params.postId)

    if(isDeleted){
        res.status(204).json()
    } else {
        res.status(404).json()
    }

}