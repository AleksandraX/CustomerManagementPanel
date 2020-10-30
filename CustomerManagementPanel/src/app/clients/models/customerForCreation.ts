import { Address } from './address';
import { Gender } from './customer';

export class CustomerForCreation{
    name: string;
    lastName: string;
    age: number;
    address: Address;
    phoneNumber: string;
    email: string;
    gender: Gender;
}