import {DbType} from "./db-type";

export const db: DbType = {
    blogs: [
        {
            "id": "1",
            "name": "string", //maxLength: 15
            "description": "string", //maxLength: 500
            "websiteUrl": "https://unZsgo1mZxaWbkgbP6XACgXovODuNvmYmFX.CO2Stig-GQjYhiWwc.G5fDEKWgXeMqX1gEq81NMe2H5qFUQ1iHgap4IK" //maxLength: 100 || regex: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$

        }
    ],
    posts: [
        {
            "id": "2",
            "title": "string", //maxLength: 30
            "shortDescription": "string", //maxLength: 100
            "content": "string", //maxLength: 1000
            "blogId": "string",
            "blogName": "string"
        }
    ]
}