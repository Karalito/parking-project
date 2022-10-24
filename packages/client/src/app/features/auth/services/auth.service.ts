import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = DOMAIN_NAMES.URL + DOMAIN_NAMES.AUTH;

  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) {}

  login() {
    location.href = this.authUrl;
  }

  getUser() {
    return this.http.get(`${this.authUrl}/profile`);
  }

  logout() {
    this.cookieService.delete('authorization');
    this.router.navigate(['home']);
  }
}
