export interface Order{
    id: string,
    price: number,
    creationDate: Date,
    lastUpdateDate?: Date,
    orderedByCustomerId: string,
    orderedByCustomerFullName: string,
    statusId: string
  }

  export enum Gender{
    male = 0,
    female = 1
  }