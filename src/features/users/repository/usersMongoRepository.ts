import {UsersDbModel} from "../types/usersDbModel";
import {userCollection} from "../../../db/mongo-db";
import {WithId} from "mongodb";

export const usersMongoRepository = {

    async createUser(newUser: UsersDbModel): Promise<string | null> {
        const UserId = await userCollection.insertOne(newUser)
        return UserId.insertedId ? UserId.insertedId.toString() : null
    },

    async findByLoginOrEmail(login: string, email: string): Promise<WithId<UsersDbModel> | null> {
        return userCollection.findOne({
            $or: [
                {email: email}, {login: login}
            ],
        })
    },


}