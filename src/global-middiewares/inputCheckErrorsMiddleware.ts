import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputCheckErrorsMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    //array({onlyFirstError: true})}) вернет только первую ошибку.
    const e = validationResult(req);
    const errors = e.array({onlyFirstError: true})

    if (errors.length) {
        res.status(400).json({errorsMessages: errors.map(i => i.msg)})
        return
    }
    next()
}

//Должно вернуть: { errorsMessages: [{ message: Any<String>, field: "websiteUrl" }, { message: Any<String>, field: "name" }] }
