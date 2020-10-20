import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientsDetailsResolver } from './clients-details.resolve';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path:'',
          redirectTo: '/list',
          pathMatch: 'full',
        },
        {
            path:'list',
            component: ClientListComponent,
        },
        {
            path: 'add',
            component: AddCustomerComponent,
        },
        {
            path: 'details/:id',
            component: ClientDetailsComponent,
            resolve: {
                customer: ClientsDetailsResolver,
            }
        },

      ]}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  