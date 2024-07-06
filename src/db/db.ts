import {BlogsDbType} from "./dbType/blog-db-type";
import {PostsDbType} from "./dbType/post-db-type";

//Типизируем db и указываем что данные мы храним в массиве.
export type DBType = {
    blogs: BlogsDbType[]
    posts: PostsDbType[]
}

export const db: DBType = {
    blogs: [
        {
            "id": "1",
            "name": "string",
            "description": "string",
            "websiteUrl": "https://git.com"

        }
    ],
    posts: [
        {
            "id": "2",
            "title": "string",
            "shortDescription": "string",
            "content": "string",
            "blogId": "string",
            "blogName": "string"
        }
    ]
}