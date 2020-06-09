export interface PaginatedItems<T> {
    count: number;
    pageSize: number;
    pageIndex: number;
    data: Array<T>;
}