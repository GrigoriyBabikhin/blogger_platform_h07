import express from 'express'
import {SETTINGS} from "./settings";
import {blogsRouter} from "./features/blogs/1_blogsRouter";
import {postsRouter} from "./features/posts/1_postsRouter";
import {testingRouter} from "./features/testing/testing-router";


export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах

app.use(SETTINGS.PATH.TESTING,testingRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
