import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersComponent } from './orders/orders.component';

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
        redirectTo: 'clients',
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
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
  exports: [RouterModule]
})
export class AppRoutingModule {}