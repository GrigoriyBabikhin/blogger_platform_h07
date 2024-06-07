//Типизируем blogs
export type BlogsDbType = {
    id: string
    name: string
    description: string
    "websiteUrl": string
}
//Типизируем posts
export type PostsDbType = {
    id: string,
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}
//Типизируем db и указываем что данные мы храним в массиве.
export type DbType = {
    blogs: BlogsDbType[]
    posts: PostsDbType[]
}