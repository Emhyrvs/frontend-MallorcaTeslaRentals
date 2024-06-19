import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { CreateReservationComponent } from './components/create-reservation/create-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent,
    CreateReservationComponent
    // Dodaj inne komponenty
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
