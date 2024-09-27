import {BlogInputModel} from "./blogs-types";
import {PostInputByBlogModel, PostInputModel} from "./post-types";

export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel | keyof PostInputByBlogModel

export type APIErrorResult = {
    errorsMessages: Array<FieldError> | null
}

export type FieldError = {
    message: string | null
    field: FieldNamesType | null
}