//Типизируем BD
export type BlogsDbType = {
    name: string
    description: string
    websiteUrl: string
    createdAt: string//($date-time)
    isMembership: boolean //True if user has not expired membership subscription to blog
}

export type BlogInputModel = {
    name: string // max 15
    description: string // max 500
    websiteUrl: string // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}
export type BlogViewModel = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string//($date-time)
    isMembership: boolean //True if user has not expired membership subscription to blog
}