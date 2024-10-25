import {BlogInputModel} from "../../../input-output-types/blogs-types";
import {PostInputByBlogModel, PostInputModel} from "../../../input-output-types/post-types";
import {UserInputModel} from "../../../features/users/types/userInputModel";

export type FieldNamesType =
    keyof BlogInputModel | keyof PostInputModel | keyof PostInputByBlogModel | keyof UserInputModel

export type APIErrorResult = {
    errorsMessages: Array<FieldError> | null
}

export type FieldError = {
    message: string | null
    field: FieldNamesType | null
}