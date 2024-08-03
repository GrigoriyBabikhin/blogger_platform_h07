import {Request, Response, Router} from "express";
import {getBlogsController} from "./controllers/getBlogsController";
import {createBlogController} from "./controllers/createBlogController";
import {findBlogController} from "./controllers/findBlogController";
import {putBlogController} from "./controllers/putBlogController";
import {delBlogController} from "./controllers/delBlogController";
import {blogsInputValidations} from "./blogsInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";
import {blogsRepository} from "./blogsMongoRepository";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', adminAuthentication, blogsInputValidations(), createBlogController)
blogsRouter.get('/:blogId', findBlogController)
blogsRouter.put('/:blogId', adminAuthentication, blogsInputValidations(), putBlogController)
blogsRouter.delete('/:blogId', adminAuthentication, delBlogController)
blogsRouter.delete('/', adminAuthentication, async (
    req: Request,
    res: Response) => {
    const isDeleted = await blogsRepository.deleteALL()
    if(isDeleted){
        res.status(204).json()
    } else {
        res.status(404).json()
    }
})