import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  dateEmitter = new Subject<Moment>();

  dateEmitterEvent(emittedDate: Moment) {
    this.dateEmitter.next(emittedDate);
  }
}
