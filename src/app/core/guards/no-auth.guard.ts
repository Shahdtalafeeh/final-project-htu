import { Injectable } from '@angular/core';
import {  CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements  CanLoad {
  constructor(private _userService: UsersService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]):boolean  {
      const isLoggedIn = this._userService.isloggedIn;
      if (isLoggedIn) {
        // this.router.navigateByUrl('/startups')
        return false;
      }
    return true;
  }
}
