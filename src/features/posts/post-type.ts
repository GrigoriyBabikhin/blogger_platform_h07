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