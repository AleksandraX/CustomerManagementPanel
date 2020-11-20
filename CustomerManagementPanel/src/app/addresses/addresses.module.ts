import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';
import { AddressesAddComponent } from './addresses-add/addresses-add.component';
import { AddressesDetailsComponent } from './addresses-details/addresses-details.component';
import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressesComponent } from './addresses.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [							
        AddressesComponent,
        AddressesAddComponent,
        AddressesDetailsComponent
     ],
    imports: [
      CommonModule,
      FormsModule,
      AlertModule.forRoot(),
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      AddressesRoutingModule,
      HttpClientModule,
      CarouselModule.forRoot(),
      FontAwesomeModule
    ],
    providers: [
    ],
  })
  export class AddressesModule { }