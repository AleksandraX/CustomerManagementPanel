import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrdersComponent } from './orders.component';
import { OrdersAddModal } from './orders-add/orders-add-modal';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersService } from './orders.service';
import { SharedModule } from '../shared/shared.module';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { OrdersOptionModal } from './orders-option/orders-option-modal';

@NgModule({
    declarations: [							
        OrdersComponent,
        OrdersAddModal,
        OrdersOptionModal
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
      FontAwesomeModule,
      SharedModule,
      ModalModule.forRoot()  ,
      
    ],
    providers: [
        OrdersService,
        CurrencyPipe,
        BsModalService
    ],
  })
  export class OrdersModule { }