export interface Address{
    id: string,
    city: string,
    zipCode: number,
    street: string,
    country: Country
  }

  export interface AddressForCreation {
    countryId: string;
    city: string;
    street: string;
    zipCode: string;
  }

  export interface AddressWithResidents {
    id: string;
    country: string;
    city: string;
    street: string;
    zipCode: string;
    residents: Resident[];
}

export interface Resident{
    customerId: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export class Country{
  name: string;
  code: string;
  id: string;
}