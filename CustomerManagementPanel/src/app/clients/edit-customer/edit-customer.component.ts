import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons';
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

    let country = this.copyOfCustomer.address?.country;

    if (
      this.copyOfCustomer.address !== null &&
      this.copyOfCustomer.address !== undefined
    ) {
      let country1 = this.copyOfCustomer.address.country;
    }

    this.addressService.getAllCountries().subscribe((response) => {
      this.countries = response;

      this.polandId = this.countries.find((x) => x.name === 'Poland')?.id;

      let initialCountry =
        this.address.countryId === '' || !this.address.countryId
          ? this.polandId
          : this.address.countryId;
    
    this.form = new MyFormGroup({
      name: new FormControl(this.copyOfCustomer.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
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
        country: new FormControl(this.copyOfCustomer.address?.country, [
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
      mail: new FormControl(this.copyOfCustomer.email, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(35),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
    });
  });
}

  ngOnInit() {}

  saveCustomer() {
    console.log('first step saving', this.form.value);

    let customerToCreate: CustomerForCreation = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      age: this.form.value.age,
      countryId: this.form.value.countryId,
      city: this.form.value.city,
      zipCode: this.form.value.zipCode,
      street: this.form.value.street,
      phoneNumber: this.form.value.phoneNumber,
      email: this.form.value.email,
      gender: this.form.value.gender,
    };

    console.log('saving', customerToCreate);
    // wywolac service i zapisac
    this.clientsService.create(customerToCreate).subscribe((response) => {
      console.log('Subscribe for creation');
    });
  }

  showSuccess() {
    this.toastr.success('Customer added!', 'Success!');
  }

  clean() {
    this.toastr.success('Data cleared!', 'Success!');
  }
}
