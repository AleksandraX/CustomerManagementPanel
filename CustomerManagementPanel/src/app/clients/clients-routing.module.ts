import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListResolver } from './client-list.resolver';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientsDetailsResolver } from './clients-details.resolver';
import { ClientEditResolver } from './client-edit.resolver';

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
            resolve: {
              customerList: ClientListResolver,
            }
        },
        {
          path:'add',
          redirectTo: '/edit/0',
          pathMatch: 'full',
        },
        {
          path: 'edit/:id',
          component: EditCustomerComponent,
          resolve: {
            customer: ClientEditResolver,
          }
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
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
      ClientsDetailsResolver, 
      ClientListResolver,
      ClientEditResolver
    ]
  })
  export class ClientsRoutingModule { 
  }
  