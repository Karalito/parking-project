import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../state/auth/auth.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  user$ = this.store.select(selectUser);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cookieService: CookieService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store
  ) {}

  logout() {
    this.cookieService.delete('authorization', '/');
    this.router.navigate(['login']);
  }
}
