import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getUserAttempt } from './state/auth/auth.actions';
import { DOMAIN_NAMES } from './shared/enums/domain-names.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data?: Observable<string>;
  options = {
    responseType: 'text' as const
  };
  url = DOMAIN_NAMES.URL;

  constructor(private http: HttpClient, private store: Store, private cookieService: CookieService) {}

  ngOnInit() {
    this.data = this.http.get(this.url, this.options);
    const token = this.cookieService.get('authorization');
    if (token) {
      this.store.dispatch(getUserAttempt());
    }
  }
}
