import {Request, Response, NextFunction} from "express";
import {SETTINGS} from "../settings";


export const adminAuthentication = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string //Basic YWRtaW46cXdlcnR5

    if (!auth) {
        res.status(401).json({error: 'Authentication required'})
        return
    }
    //метод Buffer.from(), который принимает строку и создает под нее буфер.\
    //Вторым необязательным параметром методу Buffer.from() можно передать кодировку.
    const buff = Buffer.from(auth.slice(6), 'base64')
    const decodedAuth = buff.toString('utf8')

    const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')


    if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== 'Basic') {
        res.status(401).json({error: 'Authentication required'})
        return;
    }

    if (decodedAuth === SETTINGS.ADMIN_AUTH || auth.slice(0, 5) !== 'Basic') {
        next()
    }

}