import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  user$ = this.store.select(selectUser);
  userData?: User;

  constructor(private cookieService: CookieService, private router: Router, private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    return this.checkIfLogged();
  }

  checkIfLogged() {
    const token = this.cookieService.get('authorization');
    this.user$.subscribe((userData) => (this.userData = userData));

    if (token && this.userData) return this.router.parseUrl('home');

    return true;
  }
}
