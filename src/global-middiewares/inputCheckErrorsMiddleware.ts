import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputCheckErrorsMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //array({onlyFirstError: true})}) вернет только первую ошибку.
        res.status(400).json({errors: errors.array({onlyFirstError: true})});
        return
    } else {
        next()
    }
}