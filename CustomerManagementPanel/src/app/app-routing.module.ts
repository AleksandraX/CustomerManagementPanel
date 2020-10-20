import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ClientListComponent } from './client-list/client-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: ClientListComponent,
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
export class AppRoutingModule { }
