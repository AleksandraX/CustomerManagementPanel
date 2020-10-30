import { Address } from './address';

export class Customer {
    id:string;
    name:string;
    lastName:string;
    age:number;
    gender:Gender;
    address:Address;
    addressId: string;
    phoneNumber:string;
    email:string;
  
    constructor(
       id: string,
       name: string,
       lastName:string,
       age:number,
       gender:Gender,
       address:Address,
       addressId: string,
       phoneNumber:string,
       email:string) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.addressId = addressId;
        this.phoneNumber = phoneNumber;
        this.email = email; 
    }
  }

  export enum Gender{
    male = 0,
    female = 1
  }