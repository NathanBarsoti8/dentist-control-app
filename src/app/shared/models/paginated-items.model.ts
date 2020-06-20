export interface PaginatedItems<T> {
    pager: Pager;
    data: Array<T>;
}

export interface Pager {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: Array<number>;
}
