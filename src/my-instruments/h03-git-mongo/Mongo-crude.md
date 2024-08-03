- Вернет нужные поля.
```ts
async blogsView(): Promise<BlogViewModel[]> {
    const blogs = await blogCollection.aggregate([
        {
            $project: {
                _id: 0,
                id: 1,
                name: 1,
                description: 1,
                websiteUrl: 1,
                createdAt: 1,
                isMembership: 1
            }
        }
    ]).toArray()
    return blogs as BlogViewModel[];
},
```
- Запросить только те поля которые нужны
```ts
await blogCollection.find({},{
    projection: {
        _id: 0,
        id: 1,
        name: 1,
        description: 1,
        websiteUrl: 1,
        createdAt: 1,
        isMembership: 1
    }
}).toArray()
```
```ts
await blogCollection.findOne({id: blogId}, {
    projection: {
        _id: 0,
        id: 1,
        name: 1,
        description: 1,
        websiteUrl: 1,
        createdAt: 1,
        isMembership: 1
    }
})
```
- Создать поле без _id
```ts
await blogCollection.insertOne(newBlog,{forceServerObjectId: true})
```
- Замапить поля 
```ts
    async map(blog: BlogsDbType): Promise<BlogViewModel> {
    const blogForView: BlogViewModel = {
    id: blog.id,
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership
}
return blogForView
},
```