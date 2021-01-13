import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  Address,
  AddressForCreation,
  Country,
} from 'src/app/clients/models/address';
import { MyFormGroup } from 'src/app/shared/extentions/myFormGroup';
import { AddressesService } from '../addresses.service';

@Component({
  selector: 'app-addresses-add',
  templateUrl: './addresses-add.component.html',
  styleUrls: ['./addresses-add.component.scss'],
})
export class AddressesAddComponent implements OnInit {
  @Input() addressesList: Address[];
  copyAddressList: AddressForCreation[] = [];
  address: AddressForCreation = {
    countryId: '',
    city: '',
    street: '',
    zipCode: '',
  };
  form: MyFormGroup = null;
  faSave = faSave;
  faTimes = faTimes;
  baseUrl: string = 'https://localhost:44391/api/addresses';
  addressForCreation: AddressForCreation[] = [];
  countries: Country[] = [];
  polandId: string;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private addressService: AddressesService,
    private route: ActivatedRoute
  ) {
    this.addressService.getAllCountries().subscribe((response) => {
      this.countries = response;

      this.polandId = this.countries.find((x) => x.name === 'Poland')?.id;

      let initialCountry =
        this.address.countryId === '' || !this.address.countryId
          ? this.polandId
          : this.address.countryId;

    this.form = new MyFormGroup({
      countryId: new FormControl(initialCountry, [
        Validators.required]),
      zipCode: new FormControl(this.address.zipCode, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(7),
        Validators.pattern('[0-9]{2}\-[0-9]{3}'),
      ]),
      city: new FormControl(this.address.city, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      street: new FormControl(this.address.street, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
    });
  });
  }

  ngOnInit() {

  }

  saveAddress() {
    console.log('first step saving', this.form.value);

    let addressToCreate: AddressForCreation = {
      countryId: this.form.value.countryId,
      city: this.form.value.city,
      zipCode: this.form.value.zipCode,
      street: this.form.value.street,
    };

    console.log('saving', addressToCreate);
    this.addressService.create(addressToCreate).subscribe((response) => {
      console.log('Subscribe for creation');
    });
  }

  showSuccess() {
    this.toastr.success('Customer added!', 'Success!');
  }

  clean() {
    this.toastr.success('Data cleared!', 'Success!');
  }

  handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(operation);
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
};