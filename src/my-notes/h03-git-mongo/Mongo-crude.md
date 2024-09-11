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
 async mapAndFindBlogById(blogId: string): Promise<BlogViewModel | null> {
    const blog = await this.findBlogById(blogId)
    if (blog) {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    } else {
        return null
    }
},

    async mapAndGetAll(): Promise<BlogViewModel[] | null> {
    const blog = await this.getAll()
    if (blog) {
        return blog.map(blog => ({
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }))
    } else {
        return null
    }
}
```

- найти или название или цена { price: { $gte: minPrice, $lte: maxPrice }
```ts
const result = await ordersCollection.find(
    {$or: [
            {productTitle: 'IPhone X'},
            {productPrice: {$lte: 1600}}
        ]}
).toArray()
console.log(result)
}
```