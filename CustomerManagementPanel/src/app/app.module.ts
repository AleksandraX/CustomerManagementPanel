import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClientsModule } from './clients/clients.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddressesService } from './clients/addresses/addresses.service';
import { AddressesComponent } from './clients/addresses/addresses.component';

@NgModule({
  declarations: [							
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent,
    AddressesComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ClientsModule,
    NgbModule
  ],
  providers: [
    AddressesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
