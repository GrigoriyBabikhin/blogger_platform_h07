import {config} from 'dotenv'

config() // добавление переменных из файла .env в process.env

export const appConfig = {
    PORT: process.env.PORT || 3003,
    ADMIN_AUTH: 'admin:qwerty',
    JWT_SECRET: process.env.JWT_SECRET || "c2VjcmV0ODcya2V5",
    JWT_EXPIRES: process.env.JWT_EXPIRES,

    MONGO_URL: process.env.MONGO_URL || "mongodb+srv://grigoriybabikhin:Bloger.03@cluster0.2ee3ewa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    DB_NAME: "Blogger-Platform",
    BLOG_COLLECTION_NAME: 'blogCollection',
    POST_COLLECTION_NAME: 'postCollection',
    USER_COLLECTION_NAME: 'userCollection',

    PATH: {
        TESTING: '/testing/all-data',
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        AUTH: '/auth'
    },
}
//admin\qwerty
//"/testing/all-data"