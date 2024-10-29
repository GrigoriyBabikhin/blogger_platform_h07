import {Request, Response} from "express";
import {UserInputModel} from "./types/userInputModel";
import {UserViewModel} from "./types/userViewModel";
import {usersService} from "./3_usersService";
import {usersMongoQueryRepository} from "./repository/usersMongoQueryRepository";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {ErrorMessage} from "../../utilities/resultError/resultType";
import {Paginator, SortingQueryField} from "../../utilities/paginationAndSorting/paginator-type";

export const usersController = {
    async getAllUsers(
        req: Request<any, any, any, SortingQueryField>,
        res: Response<Paginator<UserViewModel[]>>
    ){
        const users = await usersMongoQueryRepository.getAll(req.query)
        return res.status(200).json(users)
    },

    async createUser(
        req: Request<any, any, UserInputModel>,
        res: Response<UserViewModel | ErrorMessage>
    ) {
        const {login, email, password} = req.body
        const userId = await usersService.createUser({login, email, password})

        const {status, data, errorsMessages} = userId
        if (status === ResultStatus.BadRequest) {
            res.status(400).json(errorsMessages)
        }

        const mapUser = await usersMongoQueryRepository.findUserId(data!)
        return res.status(201).json(mapUser!)
    },
}