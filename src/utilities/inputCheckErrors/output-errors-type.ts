import {UserInputModel} from "../../features/users/types/userInputModel";
import {BlogInputModel} from "../../features/blogs/blogsModel";
import {PostInputByBlogModel, PostInputModel} from "../../features/posts/post-type";

export type FieldNamesType =
    keyof BlogInputModel | keyof PostInputModel | keyof PostInputByBlogModel | keyof UserInputModel

export type APIErrorResult = {
    errorsMessages: Array<FieldError> | null
}

export type FieldError = {
    message: string | null
    field: FieldNamesType | null
}