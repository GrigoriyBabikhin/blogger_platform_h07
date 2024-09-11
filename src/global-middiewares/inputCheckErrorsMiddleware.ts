import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {APIErrorResult, FieldError} from "../input-output-types/output-errors-type";

export const inputCheckErrorsMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const e = validationResult(req);
        const errors = e.array({onlyFirstError: true});
        if (errors.length) {
            const formattedErrors: FieldError[] = errors.map(i => i.msg)

            const errorResponse: APIErrorResult = {
                errorsMessages: formattedErrors.length ? formattedErrors : null
            }
            return res.status(400).json(errorResponse)
        }
      return  next()
    } catch
        (e) {
        const errorResponse: APIErrorResult = {
            errorsMessages: [
                {
                    message: 'server error',
                    field: null,
                }
            ]
        }
       return  res.status(500).json(errorResponse)
    }
}

//Должно вернуть: { errorsMessages: [{ message: Any<String>, field: "websiteUrl" }, { message: Any<String>, field: "name" }] }
//array({onlyFirstError: true})}) вернет только первую ошибку.


// if (errors.length) {
//     res.status(400).json({errorsMessages: errors.map(i => i.msg)})
//     return
// }
// next()