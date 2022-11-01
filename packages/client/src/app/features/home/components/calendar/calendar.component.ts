import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { MAX_DATE, MIN_DATE, MY_FORMATS, TODAY_DATE } from 'src/app/shared/constants/constants';
import { CalendarService } from '../../services/calendar/calendar.service';
import { CustomCalendarHeader } from './calendar-header/calendar-header.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    // for lithuanian calendar
    // { provide: MAT_DATE_LOCALE, useValue: 'lt-LT' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class CalendarComponent implements OnInit {
  customCalendarHeader = CustomCalendarHeader;
  changeDetection: ChangeDetectionStrategy.OnPush;
  btnNext = true;
  btnPrevious = true;
  todayDate = TODAY_DATE;

  public minDate = MIN_DATE;
  public maxDate = MAX_DATE;
  public showDate = new FormControl(this.todayDate, [Validators.required]);

  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {
    this.showDate.valueChanges.subscribe((date: moment.Moment) => {
      if (this.showDate.status === 'VALID' && this.showDate.value != null) {
        this.calendarService.dateEmitterEvent(date);
      }
    });
  }

  nextDay() {
    this.todayDate = moment(this.showDate.value).add(1, 'day');
    this.showDate.setValue(this.todayDate);
  }

  previousDay() {
    this.todayDate = moment(this.showDate.value).subtract(1, 'day');
    this.showDate.setValue(this.todayDate);
  }
}
