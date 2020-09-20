export interface Scheduling {
    id: string;
    date: any;
    timeTable: string;
    customerId: any;
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

export interface FormDates {
    inicialDate: any;
    finalDate: any;
}