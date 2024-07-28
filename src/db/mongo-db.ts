import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogsDbType} from "./dbType/blog-db-type";

export const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db : Db = client.db(SETTINGS.DB_NAME)

export const blogCollection: Collection<BlogsDbType> = db.collection<BlogsDbType>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<BlogsDbType> = db.collection<BlogsDbType>(SETTINGS.POST_COLLECTION_NAME)
export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to mongodb')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}

