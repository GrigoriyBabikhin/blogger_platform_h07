import {LoginInputModel} from "./types";
import {Request, Response} from "express";
import {authService} from "./authService";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {LoginSuccessViewModel} from "../../utilities/jwtService/jwtModel";
import {usersMongoQueryRepository} from "../users/repository/usersMongoQueryRepository";

export const authController = {
    async authUser(
        req: Request<any, any, LoginInputModel>,
        res: Response<LoginSuccessViewModel>,
    ) {
        const {loginOrEmail, password} = req.body
        const accessToken = await authService.loginUser({loginOrEmail, password})

        const {status, data} = accessToken
        if(status === ResultStatus.Unauthorized) {
            res.status(401).json()
            return
        }

        const accessTokenDTO = await usersMongoQueryRepository.accessTokenDTO(data!)
        return res.status(200).json(accessTokenDTO)
    },
}