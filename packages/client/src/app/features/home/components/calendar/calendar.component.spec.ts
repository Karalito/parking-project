import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CalendarComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('nextDay', () => {
    it('showDate = todayDate', () => {
      component.todayDate = moment('2022-09-01');
      component.showDate.setValue(moment('2022-09-01'));
      component.nextDay();
      expect(component.showDate.value).toEqual(component.todayDate);
    });
  });

  describe('previousDay', () => {
    it('showDate = todayDate', () => {
      component.todayDate = moment('2022-09-01');
      component.showDate.setValue(moment('2022-09-01'));
      component.previousDay();
      expect(component.showDate.value).toEqual(component.todayDate);
    });
  });
});
