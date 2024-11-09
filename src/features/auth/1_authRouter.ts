import {Router} from "express";
import {authController} from "./2_authController";
import {authInputValidation} from "./authInputValidation";


export const authRouter = Router({})

authRouter.post('/login',...authInputValidation(), authController.authUser)
authRouter.get('/me',)