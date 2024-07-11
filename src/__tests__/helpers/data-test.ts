import {codedAuthBase64} from "../../global-middiewares/adminAuthentication";
import {SETTINGS} from "../../settings";

export const createdString = (length: number) => {
    return 'a'.repeat(length)
}

export const codedAuth = codedAuthBase64(SETTINGS.ADMIN_AUTH)

export const updateBlogs = {
    "name": "New string",
    "description": "New string",
    "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
}