//Типизируем BD
export type PostsDbType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string //($date-time)
}

export type PostId = {
    postId: string
}
export type PostInputModel = {
    title: string // max 30
    shortDescription: string // max 100
    content: string // max 1000
    blogId: string // valid
}
export type PostViewModel = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string //($date-time)
}
export type PostInputByBlogModel = {
    title: string // max 30
    shortDescription: string // max 100
    content: string // max 1000
}