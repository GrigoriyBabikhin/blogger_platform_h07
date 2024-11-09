import express from 'express'
import {appConfig} from "./appConfig";
import {blogsRouter} from "./features/blogs/1_blogsRouter";
import {postsRouter} from "./features/posts/1_postsRouter";
import {testingRouter} from "./features/testing/testing-router";
import {usersRouter} from "./features/users/1_usersRouter";
import {authRouter} from "./features/auth/1_authRouter";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах

app.use(appConfig.PATH.TESTING,testingRouter)
app.use(appConfig.PATH.BLOGS, blogsRouter)
app.use(appConfig.PATH.POSTS, postsRouter)
app.use(appConfig.PATH.USERS, usersRouter)
app.use(appConfig.PATH.AUTH, authRouter)

