import {ResultStatus} from "./resultStatus";

export type Result<T = null> = {
    status: ResultStatus
    errorsMessages?: { message: string, field: string }[]
    data: T
}