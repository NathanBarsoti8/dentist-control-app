export interface SchedulesByDay {
    date: any;
    timeTable: string;
    Customer: {
        name: string;
        id: string;
    }
    ServiceType: {
        name: string;
    }
}

export interface WppLink {
    wppLink: string;
}