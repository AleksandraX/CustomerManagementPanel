import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address, AddressForCreation } from 'src/app/clients/models/address';
import { AddressesService } from '../addresses.service';


@Component({
  selector: 'app-addresses-add',
  templateUrl: './addresses-add.component.html',
  styleUrls: ['./addresses-add.component.scss']
})
export class AddressesAddComponent implements OnInit {

  address: AddressForCreation = { country: "", city: "", street: "", zipCode: ""};
  form: FormGroup = null; 

  constructor(
    private addressService: AddressesService,
  ) {
    this.form = new FormGroup({
    "country": new FormControl(this.address.country,[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
    "zipCode": new FormControl(this.address.zipCode,[Validators.required, Validators.minLength(5), Validators.maxLength(6), Validators.pattern('[0-9]*')]),
    "city": new FormControl(this.address.city,[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
    "street": new FormControl(this.address.street,[Validators.required, Validators.minLength(3), Validators.maxLength(40)])
  }); }


  ngOnInit() {
  }

  saveAddress(){
    console.log("first step saving", this.form.value);

    let addressToCreate: AddressForCreation = {
      country: this.form.value.country,
      city: this.form.value.city,
      zipCode: this.form.value.zipCode,
      street: this.form.value.street
    }

    console.log("saving", addressToCreate)
    // wywolac service i zapisac
     this.addressService.create(addressToCreate).subscribe(response => {
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
