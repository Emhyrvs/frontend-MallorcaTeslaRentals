import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:5157/api/Reservations';
  private apiUrl2 = 'http://localhost:5157/api/Car';
  private apiUrl3 = 'http://localhost:5157/api/Location';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addReservation(reservationData: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservationData);
  }
  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }
  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl3);
  }
}
