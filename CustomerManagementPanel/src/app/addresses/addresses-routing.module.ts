import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesAddComponent } from './addresses-add/addresses-add.component';
import { AddressesDetailsComponent } from './addresses-details/addresses-details.component';
import { AddressesDetailsResolver } from './addresses-details/addresses-details.resolver';
import { AddressesComponent } from './addresses.component';
import { AddressesResolver } from './addresses.resolver';

const routes: Routes = [
    {
      path: '',
      children: [
        {
            path:'',
            redirectTo: '/addresses/list',
            pathMatch: 'full',
        },
        {
            path: 'list',
            component: AddressesComponent,
            resolve: {
                addressesList: AddressesResolver,   
            }  
        },  
        {
            path: 'add',
            component: AddressesAddComponent,
            resolve: {
                addressesList: AddressesResolver,
            }
        },
        {
            path: 'details/:id',
            component: AddressesDetailsComponent,
            resolve: {
                addressDetails: AddressesDetailsResolver,
            }
        },


]}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AddressesResolver, 
        AddressesDetailsResolver
    ]
    })
export class AddressesRoutingModule { 
}