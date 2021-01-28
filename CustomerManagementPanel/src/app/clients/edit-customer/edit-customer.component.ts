import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faSave, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AddressesService } from 'src/app/addresses/addresses.service';
import { MyFormGroup } from 'src/app/shared/extentions/myFormGroup';
import { ClientsService } from '../clients.service';
import { AddressForCreation, Country } from '../models/address';
import { Customer } from '../models/customer';
import { CustomerForCreation } from '../models/customerForCreation';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  // @Input("newCustomerInput") newCustomer: Customer;
  @Output() addNewCustomerEventEmitter = new EventEmitter<Customer>();

  copyOfCustomer: Customer;
  isDisabled: boolean = true;
  addingMode: boolean = false;
  faSave = faSave;
  faUserAlt = faUserAlt;
  address: AddressForCreation = {
    countryId: '',
    city: '',
    street: '',
    zipCode: '',
  };

  form: MyFormGroup = null;
  customerExist: boolean = true;
  countries: Country[] = [];
  polandId: string;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private addressService: AddressesService,
    private toastr: ToastrService
  ) {
    this.route.data.subscribe((value) => {
      this.copyOfCustomer = value['customer'];
      console.log('in component: ', this.copyOfCustomer);

      if (this.copyOfCustomer.id === '0') {
        this.addingMode = true;
      } else if (this.copyOfCustomer === null) {
        this.customerExist = false;
      }
    });

    this.addressService.getAllCountries().subscribe((response) => {
      this.countries = response;
      console.log('countires', this.countries);

      this.polandId = this.countries.find((x) => x.name === 'Poland')?.id;
    });

    this.form = new MyFormGroup({
      name: new FormControl(this.copyOfCustomer.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      lastName: new FormControl(this.copyOfCustomer.lastName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      age: new FormControl(this.copyOfCustomer.age, [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('[0-9]*'),
      ]),
      address: new FormGroup({
        countryId: new FormControl(this.copyOfCustomer.address?.country.id, [
          Validators.required,
        ]),
        zipCode: new FormControl(this.copyOfCustomer.address?.zipCode, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ]),
        city: new FormControl(this.copyOfCustomer.address?.city, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        street: new FormControl(this.copyOfCustomer.address?.street, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ]),
      }),
      gender: new FormControl(this.copyOfCustomer.gender, [
        Validators.required,
      ]),
      phoneNumber: new FormControl(this.copyOfCustomer.phoneNumber, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(15),
      ]),
      email: new FormControl(this.copyOfCustomer.email, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(35),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
    });
  }

  ngOnInit() {}

  saveCustomer() {

    if(this.copyOfCustomer.id !== '0'){
      console.log('first step saving update', this.form.value);
      let customerToCreate: CustomerForCreation = {
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        age: this.form.value.age,
        countryId: this.form.value.address.countryId,
        city: this.form.value.address.city,
        zipCode: this.form.value.address.zipCode,
        street: this.form.value.address.street,
        phoneNumber: this.form.value.phoneNumber,
        email: this.form.value.email,
        gender: this.form.value.gender,
      };
  
      let isVary = this.checkCompliance();
      console.log("nasz wynik:", isVary);
      if(isVary){
        console.log('update', customerToCreate);
        this.clientsService.updateCustomer(customerToCreate).subscribe((response) => {
        this.toastr.success('Customer added!', 'Success!');
      });
      }else{
        this.toastr.error('Data cannot be saved because it has not changed','Error!');
        return false;
      }
      
  }else{
    console.log('first step saving', this.form.value);

      let customerToCreate: CustomerForCreation = {
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        age: this.form.value.age,
        countryId: this.form.value.address.countryId,
        city: this.form.value.address.city,
        zipCode: this.form.value.address.zipCode,
        street: this.form.value.address.street,
        phoneNumber: this.form.value.phoneNumber,
        email: this.form.value.email,
        gender: this.form.value.gender,
      };
  
      let isVary = this.checkCompliance();
      console.log("nasz wynik:", isVary);
      if(isVary){
        console.log('create', customerToCreate);
        this.clientsService.create(customerToCreate).subscribe((response) => {
        this.toastr.info('Customer update!', 'Success!');
      });
      }else{
        this.toastr.error('Data cannot be saved because it has not changed','Error!');
        return false;
      }
    }
  }

  // updataCustomer() {
  //   console.log('first step saving update', this.form.value);

  //   let customerToCreate: CustomerForCreation = {
  //     name: this.form.value.name,
  //     lastName: this.form.value.lastName,
  //     age: this.form.value.age,
  //     countryId: this.form.value.address.countryId,
  //     city: this.form.value.address.city,
  //     zipCode: this.form.value.address.zipCode,
  //     street: this.form.value.address.street,
  //     phoneNumber: this.form.value.phoneNumber,
  //     email: this.form.value.email,
  //     gender: this.form.value.gender,
  //   };

  //   let isVary = this.checkCompliance();
  //   console.log("nasz wynik:", isVary);
  //   if(isVary){
  //     console.log('saving', customerToCreate);
  //     this.clientsService.updateCustomer(customerToCreate).subscribe((response) => {
  //     this.toastr.success('Customer update!', 'Success!');
  //   });
  //   }else{
  //     this.toastr.error('Data cannot be saved because it has not changed','Error!');
  //     return false;
  //   }

  // }

  checkCompliance():boolean{
    if (this.copyOfCustomer.name !== this.form.value.name) {
      return true;
    }else if (this.copyOfCustomer.lastName !== this.form.value.lastName) {
      return true;
    }else if (this.copyOfCustomer.age !== this.form.value.age) {
      return true;
    }else if (this.copyOfCustomer.address.country.id !== this.form.value.address.countryId) {
      return true;
    }else if (this.copyOfCustomer.address.city !== this.form.value.address.city) {
      return true;
    }else if (this.copyOfCustomer.address.zipCode !== this.form.value.address.zipCode) {
      return true;
    }else if (this.copyOfCustomer.address.street !== this.form.value.address.street) {
      return true;
    }else if (this.copyOfCustomer.phoneNumber !== this.form.value.phoneNumber) {
      return true;
    }else if (this.copyOfCustomer.email !== this.form.value.email) {
      return true;
    }else if (this.copyOfCustomer.gender !== this.form.value.gender) {
      return true;
    }else{
      return false;
    }
  }

  showSuccess() {
    this.toastr.success('Customer added!', 'Success!');
  }

  clean() {
    this.toastr.success('Data cleared!', 'Success!');
  }
}
