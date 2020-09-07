export interface Customer {
    id: string;
    name: string;
    cpf: string; 
    birthDate: any;
    sex: string;
    email: string;
    job: string;
    isActive: boolean;
}

export interface CustomerDetails extends Customer {
    phoneId: string;
    phones: Array<Phone>;
    addressId: string;
    zipCode: number;
    address: string;
    addressNumber: number;
    neighborhood: string;
    complement: string;
    city: string;
    state: string;
}

export interface Phone {
    phoneType: string;
    DDD: string;
    phoneNumber: string;
}