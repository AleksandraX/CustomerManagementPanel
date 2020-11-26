import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faBroom, faSave } from '@fortawesome/free-solid-svg-icons';
import {OrdersForCreation } from 'src/app/clients/models/orders';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss']
})
export class OrdersAddComponent implements OnInit {

  form: FormGroup = null;
  faBroom = faBroom;
  faSave = faSave;

  order: OrdersForCreation ={ 
    id: "",
    price: 0,
    creationDate: null,
    fullName: "",
  };

  constructor(
    private ordersService: OrdersService,
  ) { 
    this.form = new FormGroup({
      "id": new FormControl(this.order.id,[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
      "price": new FormControl(this.order.price,[Validators.required, Validators.minLength(1), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      "creationDate": new FormControl(this.order.creationDate,[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[0-9]*')]),
      "fullName": new FormControl(this.order.fullName,[Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')])
    }); 

  }

  ngOnInit() {
  }

  saveOrders(){
    console.log("first step saving", this.form.value);

    let ordersToCreate: OrdersForCreation = {
      id: this.form.value.id,
      price: this.form.value.price,
      creationDate: this.form.value.creationDate,
      fullName: this.form.value.fullName
    }

    console.log("saving", ordersToCreate)
    // wywolac service i zapisac
     this.ordersService.create(ordersToCreate).subscribe(response => {
       console.log("Subscribe for creation")
     });
  
  };

  required(propName: string): boolean {
    return (
     this.form.get(propName)?.hasError('required') && 
     this.form.get(propName).touched &&
     this.form.get(propName).dirty
   );
   }

   minLength(propName: string): boolean {
     return (
      this.form.get(propName)?.hasError('minlength') && 
      this.form.get(propName).touched &&
      this.form.get(propName).dirty
    );
     }

   maxLength(propName: string): boolean {
     return (
       this.form.get(propName)?.hasError('maxlength') && 
       this.form.get(propName).touched &&
       this.form.get(propName).dirty
     );
     }

    pattern(propName: string): boolean {
    return (
      this.form.get(propName)?.hasError('pattern') && 
      this.form.get(propName).touched &&
      this.form.get(propName).dirty
    );
    }

}
