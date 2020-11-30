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
    orderedByCustomerId: "",
    price: 0,
  };

  constructor(
    private ordersService: OrdersService,
  ) { 
    this.form = new FormGroup({
      "price": new FormControl(this.order.price,[Validators.required, Validators.minLength(1), Validators.maxLength(9), Validators.pattern('[0-9]*')]),
      "orderedByCustomerId": new FormControl(this.order.orderedByCustomerId,[Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')])
    }); 

  }

  ngOnInit() {
  }

  saveOrders(){
    console.log("first step saving", this.form.value);

    let ordersToCreate: OrdersForCreation = {
      price: this.form.value.price,
      orderedByCustomerId: this.form.value.orderedByCustomerId,
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
