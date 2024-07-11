import express from 'express'
import {SETTINGS} from "./settings";
import {blogsRouter} from "./features/blogs/blogs-router";
import {postsRouter} from "./features/posts/posts-router";
import {testingRouter} from "./features/testing/testing-router";
import {db} from "./db/db";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах

app.use(SETTINGS.PATH.TESTING,testingRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)


//E2E тесты.
app.delete('/__test__/blogs', (req, res) => {
    db.blogs = [];
    res.status(204).json()
})

app.delete('/__test__/posts', (req, res) => {
    db.posts = [];
    res.status(204).json()
})