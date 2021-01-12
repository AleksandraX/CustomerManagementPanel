import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientsService } from './clients.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
    declarations: [							
        ClientListComponent,
        ClientDetailsComponent,
        EditCustomerComponent
     ],
    imports: [
      CommonModule,
      FormsModule,
      AlertModule.forRoot(),
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      CarouselModule.forRoot(),
      ClientsRoutingModule,
      HttpClientModule,
      FontAwesomeModule,
      SharedModule
    ],
    providers: [
      ClientsService,
      CurrencyPipe
    ],
  })
  export class ClientsModule { }
  