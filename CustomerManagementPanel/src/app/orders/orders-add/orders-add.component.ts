import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faBroom, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/clients/models/customer';
import {OrdersForCreation } from 'src/app/clients/models/orders';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss']
})
export class OrdersAddComponent implements OnInit {

  clientsList: Customer[];
  ordersAddList: OrdersForCreation[];
  form: FormGroup = null;
  faTimes = faTimes;
  faSave = faSave;

  order: OrdersForCreation ={ 
    orderedByCustomerId: "",
    price: 0,
  };

  constructor(
    private toastr: ToastrService,
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) { 
    this.form = new FormGroup({
      "price": new FormControl(this.order.price,[Validators.required, Validators.pattern("[0-9]*[.]?[0-9]+")]),
      "orderedByCustomerId": new FormControl(this.order.orderedByCustomerId,[Validators.required, Validators.minLength(3), Validators.maxLength(40)])
    }); 

      this.route.data.subscribe(response => 
        this.clientsList = response["customerList"] );
  }

  ngOnInit() {
  }

  
  // onSelectedStatus(orderedByCustomerId: string, price: number){
  //   let parametersButton: OrdersForCreation = {
  //     price: price,
  //     orderedByCustomerId: orderedByCustomerId
  //   };

  //   this.ordersService.changeOrderStatus(parametersButton).subscribe(response => {
  //     this.ordersService.getAllListItems().subscribe(response => 
  //       {
  //         this.ordersAddList = response;
  //       });
  //       this.toastr.success('Order status changed!', 'Success');
  //   })
  // }

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

    showSuccess() {
      this.toastr.success('Order added!','Success!');
    }

    clean() {
      this.toastr.success('Data cleared!','Success!');
    }

}
