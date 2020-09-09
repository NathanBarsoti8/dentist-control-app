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
    phones: Array<Phone>;
    address: Address;
}

export interface Phone {
    id: string;
    typeId: number;
    ddd: string;
    phoneNumber: string;
    customerId: string;
}

export interface Address {
    id: string;
    zipCode: string;
    state: string;
    city: string;
    address: string;
    addressNumber: number;
    neighborhood: string;
    complement: string;
    customerId: string;
}


// {
//     "id":"3C11B294-3700-4B26-B8C4-07FFF4257C00",
//     "name":"Nathan Barsoti",
//     "cpf":"46344665890",
//     "birthDate":"1998-08-08",
//     "sex":"M",
//     "email":"nathanbarsoti@hotmail.com",
//     "job":"Analista de sistemas",
//     "isActive":true,
//     "Phones":[
//        {
//           "id":"D76D7C22-1BEE-4C21-9FE2-E534EE5D0C12",
//           "typeId":1,
//           "ddd":"16",
//           "phoneNumber":"997647868",
//           "customerId":"3C11B294-3700-4B26-B8C4-07FFF4257C00"
//        }
//     ],
//     "Address":{
//        "id":"46D73005-156E-48C4-BFCA-1CBD8D267FC8",
//        "zipCode":"14900000",
//        "state":"SP",
//        "city":"Itápolis",
//        "address":"Rua das flores",
//        "addressNumber":145,
//        "neighborhood":"Jd Nova Aliança",
//        "complement":null,
//        "customerId":"3C11B294-3700-4B26-B8C4-07FFF4257C00"
//     }
//  }