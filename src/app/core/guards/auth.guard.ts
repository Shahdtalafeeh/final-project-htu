import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { UsersService } from '../services/users/users.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private _userService: UsersService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const isLoggedIn = this._userService.isloggedIn;
    if (isLoggedIn) {
      return true;
    }
    // this.router.navigate(['/home']);

    return false;
  }
}
