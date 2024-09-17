import {BlogViewModel} from "./blogs-types";
import {PostViewModel} from "./post-types";

export type Paginator<T> = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: BlogViewModel[] | PostViewModel[];
}