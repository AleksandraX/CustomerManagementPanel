import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address, AddressForCreation } from 'src/app/clients/models/address';


@Component({
  selector: 'app-addresses-add',
  templateUrl: './addresses-add.component.html',
  styleUrls: ['./addresses-add.component.scss']
})
export class AddressesAddComponent implements OnInit {

  address: AddressForCreation = { country: "", city: "", street: "", zipCode: ""};
  form: FormGroup = null; 

  constructor() {    this.form = new FormGroup({
    "country": new FormControl(this.address.country,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    "zipCode": new FormControl(this.address.zipCode,[Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    "city": new FormControl(this.address.city,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    "street": new FormControl(this.address.street,[Validators.required, Validators.minLength(3), Validators.maxLength(40)])
  }); }


  ngOnInit() {
  }

  saveAddress(){
    
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
