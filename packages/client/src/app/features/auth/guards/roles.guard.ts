import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { User } from '../../../shared/models/user.model';
import { Role } from '../../../shared/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  user$ = this.store.select(selectUser);
  userData?: User;

  constructor(private router: Router, private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    return this.checkRole();
  }

  checkRole() {
    this.user$.subscribe((userData) => (this.userData = userData));

    if (this.userData.role !== Role.ADMIN) return this.router.parseUrl('home');

    return true;
  }
}
