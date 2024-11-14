import {Router} from "express";
import {authController} from "./2_authController";
import {authInputValidation} from "./authInputValidation";
import {accessTokenGuard} from "./guards/accessTokenGuard";


export const authRouter = Router({})

authRouter.get('/me', accessTokenGuard, authController.getUserMe)
authRouter.post('/login',...authInputValidation(), authController.authUser)
