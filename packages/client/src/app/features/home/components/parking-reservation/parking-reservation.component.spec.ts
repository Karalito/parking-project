import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';
import { ParkingReservationComponent } from './parking-reservation.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ParkingReservationState } from 'src/app/state/parking-reservation/parking-reservation.reducer';
import { getParkingReservation } from 'src/app/state/parking-reservation/parking-reservation.actions';

describe('ParkingReservationComponent', () => {
  let component: ParkingReservationComponent;
  let fixture: ComponentFixture<ParkingReservationComponent>;
  let httpMock: HttpTestingController;
  let store: MockStore<{}>;
  let date = moment().utc().startOf('day');
  const initialState: ParkingReservationState = { isLoading: false, parkingReservation: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [ParkingReservationComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch an action to load data when dispatchDate called', () => {
      const action = getParkingReservation({ date });
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
