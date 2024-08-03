import {app} from './app'
import {SETTINGS} from './settings'
import {connectToDB} from "./db/mongo-db";


const startApp = async () => {
    await connectToDB()
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started on port ' + SETTINGS.PORT)
    })
}

startApp()
// http://localhost:3003/
// ssh -R 80:localhost:3003 serveo.net