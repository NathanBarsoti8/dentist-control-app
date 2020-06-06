export interface Customer {
    Id: string;
    Name: string;
    Cpf: string; 
    BirthDate: string;
    Sex: string;
    Email: string;
    Job: string;
    IsActive: boolean;
}

export interface CustomerDetails extends Customer{
    PhoneId: string;
    PhoneNumber: string;
    DDD: string;
    PhoneType: string;
    AddressId: string;
    ZipCode: number;
    Address: string;
    AddressNumber: number;
    Neighborhood: string;
    Complement: string;
    City: string;
    State: string;
}