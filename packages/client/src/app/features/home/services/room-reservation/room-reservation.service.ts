import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moment } from 'moment';
import { RoomReservation } from '../../../../shared/models/reservations.model';
import { User } from '../../../../shared/models/user.model';
import { DOMAIN_NAMES } from '../../../../shared/enums/domain-names.enum';
import { RoomReservationSpace } from '../../../../shared/models/reservation-place.model';
import { Table } from '../../../../shared/models/table.model';
import { Hardware } from '../../../../shared/models/hardware.model';

@Injectable({
  providedIn: 'root'
})
export class RoomReservationService {
  baseUrl = DOMAIN_NAMES.URL;
  roomReservationUrl = DOMAIN_NAMES.ROOM_RESERVATION;
  roomSpaceUrl = DOMAIN_NAMES.ROOM_RESERVATION_SPACE;
  user = DOMAIN_NAMES.USER;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getRoomReservation(date: Moment): Observable<RoomReservation[]> {
    return this.http.get<RoomReservation[]>(this.baseUrl + this.roomReservationUrl + '/' + `?date=${date}`);
  }

  getWorkPlace(): Observable<RoomReservationSpace[]> {
    return this.http.get<RoomReservationSpace[]>(this.baseUrl + this.roomSpaceUrl);
  }

  addRoomReservation(userId: string, roomId: string, hardwareId: string, date: Moment): Observable<RoomReservation> {
    return this.http.post<RoomReservation>(this.baseUrl + this.roomReservationUrl, {
      userId,
      roomId,
      hardwareId,
      date
    });
  }

  deleteRoomReservation(userId: string): Observable<string> {
    return this.http.delete<string>(this.baseUrl + this.roomReservationUrl + '/' + userId);
  }

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + this.user + '/' + userId);
  }

  getTableDetails(id: string): Observable<Table> {
    return this.http.get<Table>(this.baseUrl + `tables/${id}`);
  }

  getHardwareDetails(id: string): Observable<Hardware> {
    return this.http.get<Hardware>(this.baseUrl + `hardware/${id}`);
  }

  findUserReservation(userId: string): Observable<RoomReservation> {
    return this.http.get<RoomReservation>(this.baseUrl + this.roomReservationUrl + '/' + userId);
  }
}
