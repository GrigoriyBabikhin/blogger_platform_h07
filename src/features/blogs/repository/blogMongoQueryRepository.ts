import {ObjectId, WithId} from "mongodb";
import {BlogsDbType} from "../blogs-type";
import {BlogViewModel} from "../../../input-output-types/blogs-types";
import {Paginator} from "../../../input-output-types/paginator-type";
import {getPaginationAndSortOptions, SortingQueryField} from "../../utilities/paginationAndSorting";
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

    async findBlogId(blogId: string): Promise<BlogViewModel | null> {
        let blog = await blogCollection.findOne({_id: new ObjectId(blogId)})
        return blog ? await mapBlogToView(blog) : null
    },
}