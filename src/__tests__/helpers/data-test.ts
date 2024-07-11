import {codedAuthBase64} from "../../global-middiewares/adminAuthentication";
import {SETTINGS} from "../../settings";
import {PostInputModel} from "../../input-output-types/post-types";
import {BlogInputModel} from "../../input-output-types/blogs-types";

export const createdString = (length: number) => {
    return 'a'.repeat(length)
}

export const codedAuth = codedAuthBase64(SETTINGS.ADMIN_AUTH)

export const updateBlogs: BlogInputModel = {
    "name": "New string",
    "description": "New string",
    "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
}

export const updatePost: PostInputModel = {
    "title": "updatePost",
    "shortDescription": "updatePost",
    "content": "updatePost",
    "blogId": "1"
}

export const createPosts1: PostInputModel = {
    "title": "string",
    "shortDescription": "string",
    "content": "string",
    "blogId": "1"
}

export const createPosts2: PostInputModel = {
    "title": "string",
    "shortDescription": "string",
    "content": "string",
    "blogId": "1"
}