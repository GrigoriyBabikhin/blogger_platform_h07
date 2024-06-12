import {BlogsDbType} from "./blog-db-type";
import {PostsDbType} from "./post-db-type";

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
            "websiteUrl": "https://unZsgo1mZxaWbkgbP6XACgXovODuNvmYmFX.CO2Stig-GQjYhiWwc.G5fDEKWgXeMqX1gEq81NMe2H5qFUQ1iHgap4IK"

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