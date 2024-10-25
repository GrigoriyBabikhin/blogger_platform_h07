import {config} from 'dotenv'

config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    MONGO_URL: process.env.MONGO_URL ||"mongodb+srv://grigoriybabikhin:Bloger.03@cluster0.2ee3ewa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    PORT: process.env.PORT || 3003,
    PATH: {
        TESTING: '/testing/all-data',
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users'
    },
    ADMIN_AUTH: 'admin:qwerty',
    DB_NAME: "Blogger-Platform",
    BLOG_COLLECTION_NAME: 'blogCollection',
    POST_COLLECTION_NAME: 'postCollection',
    USER_COLLECTION_NAME: 'userCollection'
}
//admin\qwerty
//"/testing/all-data"