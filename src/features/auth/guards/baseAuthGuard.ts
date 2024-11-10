import {Request, Response, NextFunction} from "express";
import {appConfig} from "../../../appConfig";

export const baseAuthGuard = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const auth = req.headers['authorization'] as string

    if (!auth) {
        res.status(401).json({error: 'Authentication required'})
        return
    }

    const decodedAuth = Buffer.from(auth.slice(6), 'base64').toString('utf8')

    const codedAuth = Buffer.from(appConfig.ADMIN_AUTH, 'utf8').toString('base64')

    if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== 'Basic') {
        res.status(401).json({error: 'wrong login or password'})
        return;
    }

    if (decodedAuth === appConfig.ADMIN_AUTH || auth.slice(0, 5) !== 'Basic') {
        next()
    }
}