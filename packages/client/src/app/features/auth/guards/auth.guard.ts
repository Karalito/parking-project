import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user$ = this.store.select(selectUser);
  userData: User;

  constructor(private cookieService: CookieService, private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    return this.checkIfLogged();
  }

  checkIfLogged() {
    const token = this.cookieService.get('authorization');
    const user = this.user$.subscribe((userData) => (this.userData = userData));
    if (token && user) {
      return true;
    }
    return this.router.parseUrl('login');
  }
}
