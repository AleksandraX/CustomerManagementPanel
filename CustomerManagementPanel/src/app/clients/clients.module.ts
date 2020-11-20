import { CommonModule } from '@angular/common';
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
      ClientsRoutingModule,
      HttpClientModule,
      FontAwesomeModule
    ],
    providers: [
      ClientsService
    ],
  })
  export class ClientsModule { }
  