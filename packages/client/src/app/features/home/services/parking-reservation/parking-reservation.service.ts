import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';
import { ParkingReservation } from '../../../../shared/models/reservations.model';
import { User } from 'src/app/shared/models/user.model';
import { DOMAIN_NAMES } from '../../../../shared/enums/domain-names.enum';
import { ParkingReservationSpace } from '../../../../shared/models/reservation-place.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingReservationService {
  baseUrl = DOMAIN_NAMES.URL;
  parkingReservationsUrl = DOMAIN_NAMES.PARKING_RESERVATION;
  parkingSpacesUrl = DOMAIN_NAMES.PARKING_RESERVATION_SPACE;
  users = DOMAIN_NAMES.USER;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getParkingReservation(date: Moment): Observable<ParkingReservation[]> {
    return this.http.get<ParkingReservation[]>(this.baseUrl + this.parkingReservationsUrl + '/' + `?date=${date}`);
  }

  getParkingPlace(): Observable<ParkingReservationSpace[]> {
    return this.http.get<ParkingReservationSpace[]>(this.baseUrl + this.parkingSpacesUrl);
  }

  addParkingReservation(userId: string, parkingPlaceId: string, date: Moment): Observable<ParkingReservation> {
    return this.http.post<ParkingReservation>(this.baseUrl + this.parkingReservationsUrl, {
      userId,
      parkingPlaceId,
      date
    });
  }

  deleteParkingReservation(userId: string): Observable<string> {
    return this.http.delete<string>(this.baseUrl + this.parkingReservationsUrl + '/' + userId);
  }

  getUserDetail(userId: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + this.users + '/' + userId);
  }

  findUserReservation(userId: string): Observable<ParkingReservation> {
    return this.http.get<ParkingReservation>(this.baseUrl + this.parkingReservationsUrl + '/' + userId);
  }
}
