import {codedAuthBase64} from "../../global-middiewares/adminAuthentication";
import {SETTINGS} from "../../settings";

export const createdString = (length: number) => {
    return 'a'.repeat(length)
}

export const codedAuth = codedAuthBase64(SETTINGS.ADMIN_AUTH)