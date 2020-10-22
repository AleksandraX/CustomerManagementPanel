import { Customer } from './customer';

export let CUSTOMERLIST: Customer[] = [
    { 
    id: 11111, 
    name: "Kacper",
    lastName: "Bergański", 
    age: 21, 
    sex: "M", 
    address: {
     id: 1,
     city: "Gdynia",
     zipCode: 89302,
     street: "Buraczana",
     country: "Polska"
    },
    phoneNumber: 72123132, 
    mail: "kacper.berganski@onet.pl"
   },
   new Customer(11112, "Amor", "Murlik", 4, "M",{id: 2 ,city:"Gdynia", zipCode:81310, street:"Sosnowa", country:"Polska"},  312312312, "amor@onet.pl"),
   new Customer(11113, "Sisi", "Murlik", 7, "F",{id: 3 ,city:"Gdynia", zipCode:43310, street:"Polna", country:"Polska"}, 624381876, "sisi@wp.pl")
 ];