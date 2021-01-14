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
import { AddressesService } from './addresses/addresses.service';
import { AddressesModule } from './addresses/addresses.module';
import { ContactComponent } from './contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrdersModule } from './orders/orders.module';
import { HomeComponent } from './home/home.component';
import { InProgressComponent } from './inProgress/inProgress.component';
import { LoginPanelComponent } from './loginPanel/loginPanel.component';
import { SignUpPanelComponent } from './signUpPanel/signUpPanel.component';
import { SignUpService } from './signUpPanel/signUp.service';
import { JwPaginationModule } from 'jw-angular-pagination';
import { PaginationComponent } from './shared/pagination/pagination.component';

@NgModule({
  declarations: [												
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent,
    ContactComponent,
    HomeComponent,
    InProgressComponent,
    LoginPanelComponent,
    SignUpPanelComponent,
    // PaginationComponent
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
    NgbModule,
    AddressesModule,
    FontAwesomeModule,
    OrdersModule,
    JwPaginationModule
  ],
  providers: [
    AddressesService,
    SignUpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
