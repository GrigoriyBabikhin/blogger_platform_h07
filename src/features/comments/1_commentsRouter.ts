import {Router} from "express";
import {accessTokenGuard} from "../auth/guards/accessTokenGuard";
import {commentsController} from "./2_commentsController";
import {commentsInputValidation} from "./commentsValidation";

export const commentsRouter = Router({})

commentsRouter.get('/:commentId', commentsController.getComment)
commentsRouter.put('/:commentId',accessTokenGuard, ...commentsInputValidation(), commentsController.updateComment)
commentsRouter.delete('/:commentId',accessTokenGuard)