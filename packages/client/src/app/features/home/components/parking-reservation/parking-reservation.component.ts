import { ParkingReservation } from '../../../../shared/models/reservations.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { CalendarService } from '../../services/calendar/calendar.service';
import { ParkingReservationService } from '../../services/parking-reservation/parking-reservation.service';
import { NotificationService } from '../../../../shared/services/notifications/notification.service';
import {
  addParkingReservation,
  deleteParkingReservation,
  getParkingReservation
} from 'src/app/state/parking-reservation/parking-reservation.actions';
import {
  selectIsLoading,
  selectParkingReservation
} from 'src/app/state/parking-reservation/parking-reservation.selector';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { TODAY_DATE } from '../../../../shared/constants/constants';
import { ParkingReservationSpace } from '../../../../shared/models/reservation-place.model';

@Component({
  selector: 'app-parking-reservation',
  templateUrl: './parking-reservation.component.html',
  styleUrls: ['./parking-reservation.component.scss']
})
export class ParkingReservationComponent implements OnInit {
  dateFromCalendar: Moment = TODAY_DATE;
  parkingReservationSpaces$: Observable<ParkingReservationSpace[]>;
  parkingReservation$ = this.store.select(selectParkingReservation);
  isLoading$ = this.store.select(selectIsLoading);
  user$ = this.store.select(selectUser);
  combinedParkingReservation$ = new BehaviorSubject<ParkingReservationSpace[]>([]);
  isLoading: boolean;
  isDisabled: boolean;
  isAddDisabled: boolean;
  userId: string;
  freeParkingReservationSpaces: number;
  totalParkingReservationSpaces: number;

  constructor(
    private readonly parkingReservationService: ParkingReservationService,
    private store: Store,
    private calendarService: CalendarService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.store.dispatch(getParkingReservation({ date: this.dateFromCalendar }));
    this.calendarService.dateEmitter.subscribe((date: Moment) => {
      this.dateFromCalendar = date;
      this.store.dispatch(getParkingReservation({ date }));
    });
    this.parkingReservationSpaces$ = this.parkingReservationService.getParkingPlace();

    combineLatest([this.parkingReservationSpaces$, this.parkingReservation$]).subscribe(
      ([parkingSpaces, parkingReservations]) => {
        this.user$.subscribe((userData) => (this.userId = userData._id));
        this.isDisabled = this.dateFromCalendar < TODAY_DATE;
        this.isAddDisabled = parkingReservations.find((reservation) => reservation.userId === this.userId)
          ? true
          : false;
        this.freeParkingReservationSpaces = parkingSpaces.length - parkingReservations.length;
        this.totalParkingReservationSpaces = parkingSpaces.length;
        for (const space of parkingSpaces) {
          let existingParking = parkingReservations.find(
            (reservation) => reservation.parkingPlaceId === space.parkingPlaceId
          );
          existingParking
            ? (this.parkingReservationService.getUserDetail(existingParking.userId).subscribe((existingUser: User) => {
                space.name = existingUser.fullName;
                space.avatar = existingUser.avatar;
              }),
              (space._id = existingParking._id))
            : (space.name = '');
        }
        this.combinedParkingReservation$.next(parkingSpaces);
        this.isLoading$.subscribe((isLoading) => (this.isLoading = isLoading));
      }
    );
  }

  addReservation(newReservation: ParkingReservation) {
    this.isLoading = true;
    let userHasReservation: ParkingReservation;
    this.parkingReservation$.subscribe((reservations) => {
      userHasReservation = reservations.find((reservation) => reservation.userId === this.userId);
    });
    if (!userHasReservation) {
      return this.store.dispatch(
        addParkingReservation({
          userId: this.userId,
          parkingPlaceId: newReservation.parkingPlaceId,
          date: this.dateFromCalendar
        })
      );
    }
    this.isLoading = false;
    return this.notificationService.showFailAdd();
  }

  deleteReservation(existingReservation: ParkingReservation) {
    this.isLoading = true;
    let IsUserReservation: ParkingReservation;
    this.parkingReservation$.subscribe((reservations) => {
      IsUserReservation = reservations.find(
        (reservation) => reservation.userId === this.userId && reservation._id === existingReservation._id
      );
    });
    if (IsUserReservation) {
      return this.store.dispatch(deleteParkingReservation({ userId: existingReservation._id }));
    }
    this.isLoading = false;
    return this.notificationService.showFailDelete();
  }
}
