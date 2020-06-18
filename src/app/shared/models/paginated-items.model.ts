export interface PaginatedItems<T> {
    count: number;
    previous: number;
    next: number;
    data: Array<T>;
}