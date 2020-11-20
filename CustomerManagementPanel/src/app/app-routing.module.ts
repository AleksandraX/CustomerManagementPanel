import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddressesResolver } from './addresses/addresses.resolver';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersResolver } from './orders/orders.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        redirectTo: 'clients',
        pathMatch: 'full',
      },
      {
        path: 'home',
        redirectTo: '/clients/list',
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
        resolve: {
          ordersList: OrdersResolver,
        }
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
      },
      {
        path:'addresses',
        loadChildren: () => import('./addresses/addresses.module').then(m => m.AddressesModule),
      },
      {
        path: '**',
        redirectTo: '/404',
      },
      {
        path: '404',
        component: NotFoundComponent,

      }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AddressesResolver,
    OrdersResolver
  ]
})
export class AppRoutingModule {}