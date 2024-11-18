import {createdString} from "./utilities";
import {BlogInputModel} from "../../features/blogs/blogsModel";
import {PostInputByBlogModel, PostInputModel} from "../../features/posts/post-type";

export const nonExistentMongoId = '/66f56bb5e952f95dd90e2d11';
export const blogInput: BlogInputModel = {
    "name": "string",
    "description": "string",
    "websiteUrl": "https://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce"
}

export const blogUpdateInput: BlogInputModel = {
    "name": "New string",
    "description": "New string",
    "websiteUrl": "https://ahR1MhNIAM7d1TrId44K4AQ-7HCEhpDjcwjbWu5jK8dqVYcEOZ2ghXxchV8PasacRFEwes2nrYDlH.tum-dfMzj5GDeZ"
}

export const blogInvalidURLInput: BlogInputModel = {
    "name": "string",
    "description": "string",
    "websiteUrl": "http://lP6l1u4Pwjtkp-z4Uv4sK6A0.7yyQTRFBja9C.LK5hDVMX5K-dfu54-4AoNS8Yjyb2EJaaXW5NQaSxVIr2eFtQcRyNce",
};

export const blogInvalidLengthStingInput: BlogInputModel = {
    "name": createdString(16),
    "description": createdString(501),
    "websiteUrl": createdString(101),
};
export const postInvalidLengthStingInput: PostInputModel = {
    "title": createdString(31),
    "shortDescription": createdString(101),
    "content": createdString(1001),
    "blogId": '66f56bb5e952f95dd90e2d11'
}

export const postInput: PostInputModel = {
    "title": "string",
    "shortDescription": "string",
    "content": "string",
    "blogId": "string"
}

export const postUpdateInput: PostInputModel = {
    "title": "updatePost",
    "shortDescription": "updatePost",
    "content": "updatePost",
    "blogId": "string"
}

export const postByBlogInput: PostInputByBlogModel = {
    "title": "string",
    "shortDescription": "string",
    "content": "string",
}

export const postByBlogInvalidLengthStingInput: PostInputByBlogModel = {
    "title": createdString(31),
    "shortDescription": createdString(101),
    "content": createdString(1001),
}




