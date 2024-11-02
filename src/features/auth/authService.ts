import {LoginInputModel} from "./types";
import {Result} from "../../utilities/resultError/resultType";
import {usersMongoRepository} from "../users/repository/usersMongoRepository";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {bcryptService} from "../../utilities/bcryptService";


export const authService = {
    async loginUser(loginInput: LoginInputModel): Promise<Result<string | null>> {
        const {loginOrEmail, password} = loginInput;
        const existingUser = await usersMongoRepository.checkLoginOrEmail(loginOrEmail)
        if (!existingUser) {
            return {
                status: ResultStatus.NotFound,
                errorsMessages: [{
                    message: 'such login or email does not exist',
                    field: 'loginOrEmail'
                }],
                data: null
            }
        }

        const hash = existingUser.passwordHash

        const checkPassword = await bcryptService.checkPassword(password, hash)
        if (!checkPassword) {
            return {
                status: ResultStatus.Unauthorized,
                data: null
            }
        }

        return {
            status: ResultStatus.Success,
            data: null
        }

    }

}