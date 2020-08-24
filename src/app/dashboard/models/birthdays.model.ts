export interface CustomerBirthday {
    customers: Customers[];
}

export interface Customers {
    id: string;
    name: string;
    birthDate: any;
    day: number;
}