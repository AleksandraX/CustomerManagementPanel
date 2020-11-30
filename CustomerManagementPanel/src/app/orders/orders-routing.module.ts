import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
            // resolve: {
            //     addressesList: OrdersResolver,
            // }
        },

]}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        OrdersResolver
    ]
    })
export class OrdersRoutingModule { 
}