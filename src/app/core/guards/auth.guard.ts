import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { AdminService } from '../services/users/admin.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private _adminService: AdminService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const isLoggedIn = this._adminService.isloggedIn;
    if (isLoggedIn) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
