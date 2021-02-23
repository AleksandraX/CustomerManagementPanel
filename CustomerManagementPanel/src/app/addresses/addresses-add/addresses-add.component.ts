import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ɵConsole,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
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
export class AddressesAddComponent implements OnInit, AfterViewInit, OnChanges {


  @ViewChild('viewCountries') countrysChild: ElementRef;

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
  faArrowLeft = faArrowLeft;
  baseUrl: string = 'https://api.kacper-berganski-portfolio.pl/api/addresses';
  countries: Country[] = [];
  polandId: string;
  initialCountry: string;

  countryId: string;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private addressService: AddressesService,
    private route: ActivatedRoute
  ) {
   
    let zipCodePattern = '[0-9]{2}-[0-9]{3}'; // XX-XXX
    let cityPattern = '[a-zA-Z ]*';

      this.form = new MyFormGroup({
        countryId: new FormControl(this.address.countryId, [Validators.required]),
        zipCode: new FormControl(this.address.zipCode, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7),
          Validators.pattern(zipCodePattern),
        ]),
        city: new FormControl(this.address.city, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(cityPattern)
        ]),
        street: new FormControl(this.address.street, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ]),
      });
  }
  ngAfterViewInit(): void {
   
    //this.countrysChild.nativeElement.value = this.initialCountry;;
  }

  ngOnInit() {
    this.addressService.getAllCountries().subscribe((response) => {
      this.countries = response;

      this.polandId = this.countries.find((x) => x.name === 'Poland')?.id;

      this.initialCountry =
        this.address.countryId === '' || !this.address.countryId
          ? this.polandId
          : this.address.countryId;

          this.form.value.countryId = this.initialCountry;
          this.form.controls["countryId"].setValue(this.initialCountry);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }

  saveAddress() {
    let addressToCreate: AddressForCreation = {
      countryId: this.form.value.countryId,
      city: this.form.value.city,
      zipCode: this.form.value.zipCode,
      street: this.form.value.street,
    };

    console.log("saving", addressToCreate);
    this.addressService.create(addressToCreate).subscribe((response) => {});
    
  }

  showSuccess() {
    this.toastr.success('Customer added!', 'Success!');
  }

  clean() {
    this.toastr.success('Data cleared!', 'Success!');
  }

  handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
