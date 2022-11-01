// import { PARKINGRESERVATIONLIST } from '../../mock-reservations';
// import { of } from 'rxjs';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ParkingReservationListComponent } from './parking-reservation-list.component';
// import { ParkingReservation } from '../../../models/reservations';
// import { provideMockStore } from '@ngrx/store/testing';
// import { ParkingReservationService } from '../../../services/parking-reservation/parking-reservation.service';
// import { NotificationsService } from '../../../services/notifications/notifications.service';

// describe('ParkingReservationListComponent', () => {
//   let component: ParkingReservationListComponent;
//   let fixture: ComponentFixture<ParkingReservationListComponent>;
//   let notificationsServiceSpy: NotificationsService;

//   beforeEach(async () => {
//     const reservationServiceSpy = jasmine.createSpyObj<ParkingReservationService>(['getReservations']);
//     reservationServiceSpy.getReservations.and.returnValue(of(PARKINGRESERVATIONLIST));
//     notificationsServiceSpy = jasmine.createSpyObj<NotificationsService>('NotificationService', {
//       showFail: undefined,
//       showDeleted: undefined,
//       showSuccess: undefined
//     });

//     await TestBed.configureTestingModule({
//       declarations: [ParkingReservationListComponent],
//       providers: [
//         [provideMockStore({})],
//         { provide: ParkingReservationService, useValue: reservationServiceSpy },
//         { provide: NotificationsService, useValue: notificationsServiceSpy }
//       ]
//     }).compileComponents();
//   });
//   //
//   //   beforeEach(() => {
//   fixture = TestBed.createComponent(ParkingReservationListComponent);
//   component = fixture.componentInstance;
//   fixture.detectChanges();
//   //   });
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('ngOnInit', () => {
//     it('should call getReservations', () => {
//       spyOn(component, 'getReservations');
//       component.ngOnInit();
//       expect(component.getReservations).toHaveBeenCalled();
//     });
//   });

//   describe('addReservation', () => {
//     describe('given a new person', () => {
//       it('should add a new reservation', () => {
//         const mockClick: ParkingReservation = { id: 3, name: '', place: 3 };
//         component.yourName = 'test';
//         component.addReservation(mockClick);
//         const mockNewlyCreated: ParkingReservation = { id: 3, name: 'test', place: 3 };
//         expect(component.reservationList).toContain(jasmine.objectContaining(mockNewlyCreated));
//         expect(notificationsServiceSpy.showSuccess).toHaveBeenCalled();
//       });
//     });
//     describe('given an existing person', () => {
//       it('should not allow to add new reservation if person already has one', () => {
//         const mockClick: ParkingReservation = { id: 4, name: '', place: 4 };
//         component.yourName = 'Giedrius';
//         component.addReservation(mockClick);
//         expect(component.reservationList).toEqual(PARKINGRESERVATIONLIST);
//         expect(notificationsServiceSpy.showFail).toHaveBeenCalled();
//       });
//     });
//   });
//   describe('deleteReservation', () => {
//     describe('given an existing person', () => {
//       it('should delete reservation if person name matches reserved place name', () => {
//         const mockClick: ParkingReservation = { id: 2, name: '', place: 2 };
//         component.deleteReservation(mockClick);
//         expect(component.reservationList).toEqual(PARKINGRESERVATIONLIST);
//         expect(notificationsServiceSpy.showDeleted).toHaveBeenCalled();
//       });
//     });
//   });
// });
