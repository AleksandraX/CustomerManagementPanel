export interface Address{
    id: string,
    city: string,
    zipCode: number,
    street: string,
    country: string
  }

  export interface AddressForCreation {
    country: string;
    city: string;
    street: string;
    zipCode: string;
  }