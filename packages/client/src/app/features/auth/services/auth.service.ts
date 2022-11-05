import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = DOMAIN_NAMES.URL + DOMAIN_NAMES.AUTH;

  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) {
  }

  login() {
    location.href = this.authUrl;
  }

  getUser() {
    return this.http.get(`${this.authUrl}/profile`);
  }

  getUserList() {
    return this.http.get(`${DOMAIN_NAMES.URL}users`);
  }

  updateUser(user: User) {
    const {_id, providerId, createdAt} = user;
    const body = {_id, providerId, createdAt, ...user}
    console.log(body);
    return this.http.put(`${DOMAIN_NAMES.URL}users/${user._id}`, JSON.stringify(body))
  }
}
