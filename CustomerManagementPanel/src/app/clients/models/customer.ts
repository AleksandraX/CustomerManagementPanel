import { Address } from './address';

export class Customer {
    id:number;
    name:string;
    lastName:string;
    age:number;
    sex:string;
    address:Address;
    phoneNumber:number;
    mail:string;
    static id: number;
  
    constructor(
       id: number,
       name: string,
       lastName:string,
       age:number,
       sex:string,
       address:Address,
       phoneNumber:number,
       mail:string) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.sex = sex;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.mail = mail; 
    }
  }