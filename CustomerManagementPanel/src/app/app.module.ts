import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ClientListComponent } from './client-list/client-list.component'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientListComponent,
    ClientDetailsComponent,
      AddCustomerComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
