import {codedAuthBase64} from "../../global-middiewares/adminAuthentication";
import {SETTINGS} from "../../settings";
import {req} from "./test-helpers";

export const createdString = (length: number) => {
    return 'a'.repeat(length)
}

export const codedAuth = codedAuthBase64(SETTINGS.ADMIN_AUTH)

export const clearDB = async () => {
    await req.delete(SETTINGS.PATH.TESTING)
}