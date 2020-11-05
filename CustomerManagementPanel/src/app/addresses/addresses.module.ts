import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';
import { AddressesAddComponent } from './addresses-add/addresses-add.component';
import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressesComponent } from './addresses.component';

@NgModule({
    declarations: [							
        AddressesComponent,
        AddressesAddComponent
     ],
    imports: [
      CommonModule,
      FormsModule,
      AlertModule.forRoot(),
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      AddressesRoutingModule,
      HttpClientModule
    ],
    providers: [
    ],
  })
  export class AddressesModule { }