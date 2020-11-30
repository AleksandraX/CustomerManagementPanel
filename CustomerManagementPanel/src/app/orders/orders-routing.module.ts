import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersAddResolver } from './orders-add/order-add.resolver';

import { OrdersAddComponent } from './orders-add/orders-add.component';
import { OrdersComponent } from './orders.component';
import { OrdersResolver } from './orders.resolver';

const routes: Routes = [
    { //http://localhost:4200/orders/order
      path: '',
      children: [
        {
            path:'',
            pathMatch: 'full',
            component: OrdersComponent,
            resolve: {
                ordersList: OrdersResolver
            }
        }, 
        {
            path: 'CreateOrder',
            component: OrdersAddComponent,
            resolve: {
                customerList: OrdersAddResolver,
            }
        },

]}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        OrdersResolver,
        OrdersAddResolver
    ]
    })
export class OrdersRoutingModule { 
}