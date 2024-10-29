import {SortDirection} from "./paginationAndSorting";

export type Paginator<T> = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: T;
}

export type SortingQueryField = {
    pageNumber?: string//номер страницы
    pageSize?: string//размер страницы
    sortDirection?: string//тип сортировки  ASC или DESC
    sortBy?: string//поле для сортировки
    searchNameTerm?: string
    searchLoginTerm?: string
    searchEmailTerm?: string
}

export type SortingQueryFilter = {
    pageNumber: number //обязательные свойства
    pageSize: number //обязательные свойства
    sortDirection: SortDirection.ASC | SortDirection.DESC//опциональные свойства
    sortBy: string //опциональные свойства
    searchNameTerm: string | null
    searchLoginTerm: string | null
    searchEmailTerm: string | null
}