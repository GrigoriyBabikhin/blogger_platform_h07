import {LoginInputModel, MeViewModel} from "./authModel";
import {Request, Response} from "express";
import {authService} from "./authService";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {LoginSuccessViewModel} from "../../utilities/jwtService/jwtModel";
import {usersMongoQueryRepository} from "../users/repository/usersMongoQueryRepository";
import {IdType} from "../../utilities/input-output-types/id";

export const authController = {
    async authUser(
        req: Request<any, any, LoginInputModel>,
        res: Response<LoginSuccessViewModel>,
    ) {
        const {loginOrEmail, password} = req.body
        const accessToken = await authService.loginUser({loginOrEmail, password})

        const {status, data} = accessToken
        if (status === ResultStatus.Unauthorized) {
            res.status(401).json()
            return
        }

        const accessTokenDTO = await usersMongoQueryRepository.accessTokenDTO(data!)
        return res.status(200).json(accessTokenDTO)
    },

    async getUserMe(
        req: Request<any, any, any, IdType>,
        res: Response<MeViewModel>
    ) {
        const userId = req?.user?.id as string

        if(!userId) return res.sendStatus(401)
        const me = await usersMongoQueryRepository.findUserIdDtoMe(userId)

        return res.status(200).send(me!)


    }
}