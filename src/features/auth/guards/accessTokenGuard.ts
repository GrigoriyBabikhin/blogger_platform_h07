import {Request, Response, NextFunction} from "express";
import {jwtService} from "../../../utilities/jwtService/jwtService";
import {IdType} from "../../../utilities/input-output-types/id";
import {usersMongoQueryRepository} from "../../users/repository/usersMongoQueryRepository";

export const accessTokenGuard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.headers.authorization) return res.sendStatus(401)

    const [authType, token] = req.headers.authorization.split(' ')
    if (authType !== 'Bearer') return res.sendStatus(401)

    const payload = await jwtService.verifyToken(token)
    if (payload) {
        const {userId} = payload

        const user = await usersMongoQueryRepository.findUserId(userId)
        if (!user) return res.sendStatus(401)

        req.user = {id: userId} as IdType
        return next()
    }

    return res.sendStatus(401)
}