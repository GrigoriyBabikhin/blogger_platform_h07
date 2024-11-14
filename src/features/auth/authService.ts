import {LoginInputModel} from "./authModel";
import {Result} from "../../utilities/resultError/resultType";
import {usersMongoRepository} from "../users/repository/usersMongoRepository";
import {ResultStatus} from "../../utilities/resultError/resultStatus";
import {passwordService} from "../../utilities/passwordService";
import {jwtService} from "../../utilities/jwtService/jwtService";


export const authService = {
    async loginUser(loginInput: LoginInputModel): Promise<Result<string | null>> {
        const {loginOrEmail, password} = loginInput;
        const existingUser = await usersMongoRepository.checkLoginOrEmail(loginOrEmail)
        if (!existingUser) {
            return {
                status: ResultStatus.Unauthorized,
                data: null
            }
        }

        const hash = existingUser.passwordHash

        const checkPassword = await passwordService.checkPassword(password, hash)
        if (!checkPassword) {
            return {
                status: ResultStatus.Unauthorized,
                data: null
            }
        }

        const jwtUser = await jwtService.createToken(existingUser._id.toString())

        return {
            status: ResultStatus.Success,
            data: jwtUser
        }
    },

}