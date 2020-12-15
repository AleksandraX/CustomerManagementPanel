export interface Order{
    id: string,
    price: number,
    creationDate: Date,
    lastUpdateDate?: Date,
    orderedByCustomerId: string,
    orderedByCustomerFullName: string,
    statusId: string
  }

export interface OrderStatus{
  id: string,
  name: string
}

  export enum Gender{
    male = 0,
    female = 1
  }

  export interface OrdersForCreation {
    price: number,
    orderedByCustomerId: string
  }

  export interface OrderStatusChangeParameters {
    orderId: string;
    newOrderStatusId: string;
  }