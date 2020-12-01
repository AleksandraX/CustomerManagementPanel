import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddressesResolver } from './addresses/addresses.resolver';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { InProgressComponent } from './inProgress/inProgress.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        redirectTo: 'home',
        pathMatch: 'full',
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
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
      },
      {
        path: 'inProgress',
        component: InProgressComponent,
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
    AddressesResolver
  ]
})
export class AppRoutingModule {}