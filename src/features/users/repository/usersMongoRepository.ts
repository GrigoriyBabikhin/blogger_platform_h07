import {UsersDbModel} from "../types/usersDbModel";
import {userCollection} from "../../../db/mongo-db";
import {ObjectId, WithId} from "mongodb";

export const usersMongoRepository = {

    async findById(id: string): Promise<WithId<UsersDbModel> | null> {
        if (!this._checkObjectId(id)) return null;

        let user = await userCollection.findOne({_id: new ObjectId(id)})

        return user ? user : null
    },

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

    async checkLoginOrEmail(loginOrEmail: string): Promise<WithId<UsersDbModel> | null> {
        return userCollection.findOne({
            $or: [
                {email: loginOrEmail}, {login: loginOrEmail}
            ]
        })
    },

    async delete(id: string): Promise<boolean> {
        if (!this._checkObjectId(id)) return false;
        const isDelete = await userCollection.deleteOne({_id: new ObjectId(id)})
        return isDelete.deletedCount === 1
    },

    _checkObjectId(id: string): boolean {
        return ObjectId.isValid(id)
    },

    async deleteAll() {
        return await userCollection.drop()
    }

}