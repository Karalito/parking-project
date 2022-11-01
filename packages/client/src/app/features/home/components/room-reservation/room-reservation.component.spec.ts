import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomReservationComponent } from './room-reservation.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RoomReservationState } from 'src/app/state/room-reservation/room-reservation.reducer';
import { getRoomReservation } from 'src/app/state/room-reservation/room-reservation.actions';

describe('RoomReservationComponent', () => {
  let component: RoomReservationComponent;
  let fixture: ComponentFixture<RoomReservationComponent>;
  let httpMock: HttpTestingController;
  let store: MockStore<{}>;
  let date = moment().utc().startOf('day');
  const initialState: RoomReservationState = { isLoading: false, roomReservation: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [RoomReservationComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch an action to load data when dispatchDate called', () => {
      const action = getRoomReservation({ date });
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
