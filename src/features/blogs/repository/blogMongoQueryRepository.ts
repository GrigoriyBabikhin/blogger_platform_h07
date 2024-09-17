import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {BlogsDbType} from "../blogs-type";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {Paginator} from "../../../input-output-types/paginator-type";
import {getPaginationAndSortOptions, SortingQueryField, SortingQueryFilter} from "../../utilities/paginationAndSorting";
import {blogCollection} from "../../../db/mongo-db";

export const mapBlogToView = (blog: WithId<BlogsDbType>): BlogViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}


export const blogMongoQueryRepository = {
    async getAllBlogs(query: SortingQueryField): Promise<Paginator<BlogViewModel[]>> {

        const processedQuery = getPaginationAndSortOptions(query);
        const filter = processedQuery.searchNameTerm
            ? {name: {$regex: processedQuery.searchNameTerm, $options: 'i'}}
            : {};
        const allBlogs = await blogCollection
            .find(filter)
            .sort(processedQuery.sortBy, processedQuery.sortDirection)
            .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
            .limit(processedQuery.pageSize)
            .toArray()
        const totalCount = await blogCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / processedQuery.pageSize)
        return {
            'pagesCount': pagesCount,
            'page': processedQuery.pageNumber,
            'pageSize': processedQuery.pageSize,
            'totalCount': totalCount,
            'items': allBlogs.map(mapBlogToView)
        }
    },
    // async findBlogById(blogId: string): Promise<BlogViewModel> {
    //     let blog = await blogCollection.findOne({_id: new ObjectId(blogId)})
    //     const mapBlog= await mapBlogToView(blog)
    //     return mapBlog
    // },

    async findBlogId(blogId: string): Promise<BlogViewModel | null> {
        //let blog = await this.findBlogById(createdBlogId)
        let blog = await blogCollection.findOne({_id: new ObjectId(blogId)})
        const mapBlog = blog ? await mapBlogToView(blog) : null
        return mapBlog
        // if (blog) {
        //     const newBlog = mapBlogToView(blog)
        //     return newBlog
        // } else {
        //     return null
        // }
    },

    // async mapAndFindBlogById(blogId: string): Promise<BlogViewModel | null> {
    //     const blog = await blogsRepository.findBlogById(blogId)
    //     if (blog) {
    //         return mapBlogToView(blog)
    //     } else {
    //         return null
    //     }
    // },
    //
    // async mapAndGetAll(): Promise<BlogViewModel[] | null> {
    //     const blog = await blogsRepository.getAll()
    //     if (blog) {
    //         return blog.map(mapBlogToView)
    //     } else {
    //         return null
    //     }
    // }
}