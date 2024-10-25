import {ResultStatus} from "./resultStatus";

export type ErrorMessage = { message: string, field: string }[]

export type Result<T = null> = {
    status: ResultStatus
    errorsMessages?: ErrorMessage
    data: T
}