//Типизируем BD
export type BlogsDbType = {
    name: string
    description: string
    websiteUrl: string
    createdAt: string//($date-time)
    isMembership: boolean //True if user has not expired membership subscription to blog
}

