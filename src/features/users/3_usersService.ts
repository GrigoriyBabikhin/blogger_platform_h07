import bcrypt from 'bcrypt'
import {bcryptService} from "../../utilities/bcryptService";
import {usersMongoRepository} from "./repository/usersMongoRepository";
import {UserInputModel} from "./types/userInputModel";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {Result} from "../../utilities/resultError/resultType";

export const usersService = {
    async createUser(userInput: UserInputModel): Promise<Result<string | null>> {
        const {login, email, password} = userInput

        const existingUser = await usersMongoRepository.findByLoginOrEmail(login, email)
        if (existingUser) {
            return {
                status: ResultStatus.BadRequest,
                errorsMessages: [{
                    message: 'A user with the same login or email already exists',
                    field: 'login or email'
                }],
                data: null
            }
        }

        const passwordHash = await bcryptService.hashPassword(password)

        const newUser = {
            login,
            email,
            passwordHash,
            createdAt: new Date().toISOString(),
        }

        const userId = await usersMongoRepository.createUser(newUser)

        return {
            status: ResultStatus.Created,
            data: userId
        }
    },

    async delete(id: string): Promise<Result<boolean | null>> {
        const user = await usersMongoRepository.findById(id)

        if (!user) {
            return {
                status: ResultStatus.NotFound,
                errorsMessages: [{
                    message: "Specified user is not exists",
                    field: "id"
                }
                ],
                data: null
            }
        }

        const isDelete = await usersMongoRepository.delete(id)
        return {
            status: ResultStatus.NoContent,
            data: isDelete
        }
    },

    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },

}