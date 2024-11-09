import {app} from './app'
import {appConfig} from './appConfig'
import {connectToDB} from "./db/mongo-db";


const startApp = async () => {
    await connectToDB()
    app.listen(appConfig.PORT, () => {
        console.log('...server started on port ' + appConfig.PORT)
    })
}

startApp()
// http://localhost:3003/
// ssh -R 80:localhost:3003 serveo.net