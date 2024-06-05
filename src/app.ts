import express from 'express'
import {SETTINGS} from "./settings";

export const app = express()
app.use(express.json())

app.get(SETTINGS.PATH.BLOGS, (req, res) => {
    res.status(200).json({hello: 'world' + new Date()})
})
