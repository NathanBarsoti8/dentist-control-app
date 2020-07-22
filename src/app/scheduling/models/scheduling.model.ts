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

export interface SchedulingDetails extends Scheduling {
    serviceTypeId: number;
    serviceType: string;
    customerName: string;
}

export enum Status {
    SCHEDULED = 1,
    DONE = 2
}