import {blogCollection, userCollection} from "../../../db/mongo-db";
import {ObjectId, WithId} from "mongodb";
import {UserViewModel} from "../types/userViewModel";
import {UsersDbModel} from "../types/usersDbModel";
import {
    getPaginationAndSortOptions,
    SortingQueryField
} from "../../../utilities/paginationAndSorting/paginationAndSorting";
import {Paginator} from "../../../utilities/paginationAndSorting/paginator-type";



export const usersMongoQueryRepository = {
    async getAll(query: SortingQueryField): Promise<Paginator<UserViewModel[]>> {
        const processedQuery = getPaginationAndSortOptions(query);
        const filter = processedQuery.searchNameTerm
            ? {name: {$regex: processedQuery.searchNameTerm, $options: 'i'}}
            : {};
        const users = await userCollection
            .find(filter)
            .sort(processedQuery.sortBy, processedQuery.sortDirection)
            .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
            .limit(processedQuery.pageSize)
            .toArray()
        const totalCount = await userCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / processedQuery.pageSize)
        return {
            'pagesCount': pagesCount,
            'page': processedQuery.pageNumber,
            'pageSize': processedQuery.pageSize,
            'totalCount': totalCount,
            'items': users.map(user=> this._mapUserToView(user))
        }
    },

    async findUserId(userId: string): Promise<UserViewModel | null> {
        if (!this._checkObjectId(userId)) return null
        let user = await userCollection.findOne({_id: new ObjectId(userId)})
        return user ? await this._mapUserToView(user) : null
    },

    _mapUserToView (user: WithId<UsersDbModel>): UserViewModel {
        return {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        }
    },

    _checkObjectId(id: string): boolean {
        return ObjectId.isValid(id)
    }

}