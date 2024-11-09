import {codedAuthBase64} from "../../utilities/Middleware/adminAuthentication";
import {appConfig} from "../../appConfig";
import {req} from "./test-helpers";

export const createdString = (length: number) => {
    return 'a'.repeat(length)
}

export const codedAuth = codedAuthBase64(appConfig.ADMIN_AUTH)

export const clearDB = async () => {
    await req.delete(appConfig.PATH.TESTING)
}