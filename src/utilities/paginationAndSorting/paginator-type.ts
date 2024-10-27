import {BlogViewModel} from "../../input-output-types/blogs-types";
import {PostViewModel} from "../../input-output-types/post-types";
import {UserViewModel} from "../../features/users/types/userViewModel";

export type Paginator<T> = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: T;
}