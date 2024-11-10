import {appConfig} from "../../appConfig";
import {req} from "./test-helpers";

export const createdString = (length: number) => {
    return 'a'.repeat(length)
}

const codedAuthBase64 = (code: string) => {
    return Buffer.from(code).toString('base64')
}

export const codedAuth = codedAuthBase64(appConfig.ADMIN_AUTH)

export const clearDB = async () => {
    await req.delete(appConfig.PATH.TESTING)
}