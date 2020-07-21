export interface Scheduling {
    id: string;
    date: any;
    timeTable: string;
    customerId: string;
    statusId: number;
    status: string;
    Customer: {
        name: string
    };
}

export enum Status {
    SCHEDULED = 1,
    DONE = 2
}