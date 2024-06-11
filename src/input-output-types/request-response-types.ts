export type BlogsBodyType = {
    name: string
    description: string
    websiteUrl: string
}

export type PostsBodyType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type ParamsIdBlogType = {
    blogId: string
}

export type ParamsIdPostType = {
    postId: string
}