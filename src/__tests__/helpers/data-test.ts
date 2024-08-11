import {codedAuthBase64} from "../../global-middiewares/adminAuthentication";
import {SETTINGS} from "../../settings";
import {BlogInputModel} from "../../input-output-types/blogs-types";

export const createdString = (length: number) => {
    return 'a'.repeat(length)
}

export const codedAuth = codedAuthBase64(SETTINGS.ADMIN_AUTH)
export const createBlog: BlogInputModel = {
    "name": "string",
    "description": "string",
    "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
}



export const updateBlogs: BlogInputModel = {
    "name": "New string",
    "description": "New string",
    "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
}

export const updatePost = {
    "title": "updatePost",
    "shortDescription": "updatePost",
    "content": "updatePost",
    "blogId": '1'
}

export const createPost = {
    "title": "string",
    "shortDescription": "string",
    "content": "string",
    "blogId": '1'
}


// const blog3: BlogViewModel = {
//     id: '66b8973ceb87400953ab69bf',
//     name: 'string',
//     description: 'string',
//     websiteUrl: 'https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce',
//     createdAt: '2024-08-11T10:49:32.477Z',
//     isMembership: false
// }