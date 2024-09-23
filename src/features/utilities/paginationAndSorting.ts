
export enum SortDirection {
    //'ASC' (возрастание) или 'DESC' (убывание) по умолчанию
    ASC = 'asc',
    DESC = 'desc',
}

//тип объекта какие поля могут прийти из query.
export type SortingQueryField = {
    pageNumber?: string//номер страницы
    pageSize?: string//размер страницы
    sortDirection?: string//тип сортировки  ASC или DESC
    sortBy?: string//поле для сортировки
    searchNameTerm?: string//сортировка по названию
}
//тип объекта для фильтрации и сортировки.
export type SortingQueryFilter = {
    pageNumber: number //обязательные свойства
    pageSize: number //обязательные свойства
    sortDirection: SortDirection.ASC | SortDirection.DESC//опциональные свойства
    sortBy: string //опциональные свойства
    searchNameTerm: string | null //опциональные свойства
}


export const getPaginationAndSortOptions = (query: SortingQueryField): SortingQueryFilter => {
    const pageNumber =  Number(query.pageNumber) || 1
    const pageSize = Number(query.pageSize) || 10
    const sortBy = query.sortBy || 'CreatedAt'
    //Явная проверка на то что из query прилетит "ASC" если нет то по дефолту. При компиляции в js типизация слетит.
    const sortDirection = query.sortDirection === 'asc' ? SortDirection.ASC : SortDirection.DESC
    //searchNameTerm: Поисковый запрос для названия блога: Имя должно содержать этот термин в любой позиции.
    const searchNameTerm = query.searchNameTerm ? query.searchNameTerm : null
    return  {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm
    }
}
