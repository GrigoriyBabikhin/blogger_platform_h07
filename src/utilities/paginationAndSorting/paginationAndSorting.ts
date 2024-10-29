import {SortingQueryField, SortingQueryFilter} from "./paginator-type";

export enum SortDirection {
    //'ASC' (возрастание) или 'DESC' (убывание) по умолчанию
    ASC = 'asc',
    DESC = 'desc',
}

export const getPaginationAndSortOptions = (query: SortingQueryField): SortingQueryFilter => {
    const pageNumber = Number(query.pageNumber) || 1
    const pageSize = Number(query.pageSize) || 10
    const sortBy = query.sortBy || 'createdAt'
    const sortDirection = query.sortDirection === 'asc' ? SortDirection.ASC : SortDirection.DESC
    const searchNameTerm = query.searchNameTerm ? query.searchNameTerm : null
    const searchLoginTerm = query.searchLoginTerm ? query.searchLoginTerm : null
    const searchEmailTerm = query.searchEmailTerm ? query.searchEmailTerm : null

    return {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm,
        searchLoginTerm,
        searchEmailTerm
    }
}
