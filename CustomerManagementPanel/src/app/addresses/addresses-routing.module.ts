import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesAddComponent } from './addresses-add/addresses-add.component';
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

]}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AddressesResolver, 

    ]
    })
export class AddressesRoutingModule { 
}