import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';

@NgModule({
    declarations: [							
        ClientListComponent,
        ClientDetailsComponent,
        AddCustomerComponent,
     ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CommonModule,
      AppRoutingModule,
      FormsModule,
      AlertModule.forRoot(),
      ReactiveFormsModule,
      ToastrModule.forRoot(),
    ],
    providers: [],
  })
  export class ClientsModule { }
  