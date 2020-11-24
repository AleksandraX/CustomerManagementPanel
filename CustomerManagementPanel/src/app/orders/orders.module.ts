import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrdersComponent } from './orders.component';
import { OrdersAddComponent } from './orders-add/orders-add.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersService } from './orders.service';

@NgModule({
    declarations: [							
        OrdersComponent,
        OrdersAddComponent
     ],
    imports: [
      CommonModule,
      FormsModule,
      AlertModule.forRoot(),
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      OrdersRoutingModule,
      HttpClientModule,
      CarouselModule.forRoot(),
      FontAwesomeModule
    ],
    providers: [
        OrdersService
    ],
  })
  export class OrdersModule { }