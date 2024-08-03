import {app} from './app'
import {SETTINGS} from './settings'
import {run} from "jest";
import {connectToDB} from "./db/mongo-db";
import {blogsRepository} from "./features/blogs/blogsMongoRepository";


const startApp = async () => {
    await connectToDB()
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started on port ' + SETTINGS.PORT)
    })
}

startApp()
// http://localhost:3003/
// ssh -R 80:localhost:3003 serveo.net