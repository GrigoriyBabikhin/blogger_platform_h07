import {BlogInputModel} from "./blogs-types";
import {PostInputModel} from "./post-types";

//Можно передать только те ключи которые описаны в модели.
export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel

 export type OutputErrorsType = {
     errorsMessages: {message: string, field: FieldNamesType}[]
 }
export type APIErrorResult = {
    errorsMessages: Array<FieldError> | null
}
export type FieldError = {
    message: string | null
    field: FieldNamesType | null
}