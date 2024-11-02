import {LoginInputModel} from "./types";
import {Request, Response} from "express";
import {authService} from "./authService";
import {ResultStatus} from "../../utilities/resultError/resultStatus";

export const authController = {
    async authUser(
        req: Request<any, any, LoginInputModel>,
        res: Response,
    ) {
        const {loginOrEmail, password} = req.body
        const userLogin = await authService.loginUser({loginOrEmail, password})

        const {status, errorsMessages} = userLogin

        if(status === ResultStatus.NotFound) {
            res.status(400).json({errorsMessages})
            return
        }

        if(status === ResultStatus.Unauthorized) {
            res.status(401).json()
            return
        }

        return res.status(204).json()
    },
}