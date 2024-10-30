import {Router} from "express";
import {usersController} from "./2_usersControiller";
import {adminAuthentication} from "../../utilities/Middleware/adminAuthentication";
import {userBodyValidations} from "./usersInputValidations";

export const usersRouter = Router({})

usersRouter.get('/', adminAuthentication, usersController.getAllUsers)
usersRouter.post('/', adminAuthentication, ...userBodyValidations(), usersController.createUser)
usersRouter.delete('/:id', adminAuthentication, usersController.delete)
