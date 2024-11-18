import {Collection, Db, MongoClient} from "mongodb";
import {appConfig} from "../appConfig";
import {BlogsDbType} from "../features/blogs/blogsModel";
import {PostsDbType} from "../features/posts/post-type";
import {UsersDbModel} from "../features/users/types/usersDbModel";
import {CommentDBType} from "../features/comments/commentModel";

export const client: MongoClient = new MongoClient(appConfig.MONGO_URL)
export const db : Db = client.db(appConfig.DB_NAME)

export const blogCollection: Collection<BlogsDbType> = db.collection<BlogsDbType>(appConfig.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostsDbType> = db.collection<PostsDbType>(appConfig.POST_COLLECTION_NAME)
export const userCollection: Collection<UsersDbModel> = db.collection<UsersDbModel>(appConfig.USER_COLLECTION_NAME)
export const commentCollection: Collection<CommentDBType> = db.collection<CommentDBType>(appConfig.COMMENTS_COLLECTION_NAME)
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

