import {Router} from "express";
import {usersController} from "./2_usersControiller";
import {baseAuthGuard} from "../auth/guards/baseAuthGuard";
import {userBodyValidations} from "./usersInputValidations";

export const usersRouter = Router({})

usersRouter.get('/', baseAuthGuard, usersController.getAllUsers)
usersRouter.post('/', baseAuthGuard, ...userBodyValidations(), usersController.createUser)
usersRouter.delete('/:id', baseAuthGuard, usersController.delete)
