import {SortDirection} from "mongodb";

export enum SortDirection {
    //'ASC' (возрастание) или 'DESC' (убывание) по умолчанию
    ASC = 'ASC',
    DESC = 'DESC',
}

//тап объекта какие поля могут прийти из query.
type SortingQueryField = {
    pageNumber?: string//номер страницы
    pageSize?: string//размер страницы
    sortDirection?: string//тип сортировки
    sortBy?: string//поле для сортировки ASC или DESC
    searchNameTerm?: string//сортировка по названию
}
//тип объекта для фильтрации и сортировки.
type SortingQueryFilter = {
    pageNumber: number //обязательные свойства
    pageSize: number //обязательные свойства
    sortDirection: SortDirection //опциональные свойства
    sortBy: string //опциональные свойства
    searchNameTerm: string | null //опциональные свойства
}

const paginationAndSortingQuery = (query: SortingQueryField): SortingQueryFilter => {
    const pageNumber = !isNaN(+query.pageNumber) ? +query.pageNumber : 1
    const pageSize = !isNaN(+query.pageSize) ? +query.pageSize : 10
    const sortBy = query.sortBy || 'CreatedAt'
    //const sortDirection = query.sortDirection ? query.sortDirection as SortDirection : 'desc'
    //Явная проверка на то что из query прилетит "ASC" если нет то по дефолту. при компиляции в js типизация слетит.
    const sortDirection = query.sortDirection === "ASC" ? SortDirection.ASC : SortDirection.DESC
    const searchNameTerm = query.searchNameTerm ? query.searchNameTerm : null
    const result = {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm
    }
    return result;
}