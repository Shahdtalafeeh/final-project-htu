import { Injectable } from '@angular/core';
import { NavItemDto } from '../../dto/nav-item';
import { NavMenuDto } from '../../dto/nav-menu';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor() {}
  getNavMenu() {
    return new NavMenuDto('NavMenu', [
      new NavItemDto('View-Startups', 'category', '/all-startups', ''),
      new NavItemDto('Startups', 'category', '/startups', 'admin'),
      new NavItemDto('Request', 'category', '/form', 'endUser'),
      new NavItemDto('Approval', 'notification_add', '/approve', 'admin'),
      new NavItemDto('Sectors', 'segment', '/sectors', 'admin'),
    ]);
  }
  getToolBarMenu() {
    return new NavMenuDto('ToolBarMenu', [
      new NavItemDto('Home', '', '/landing/home', ''),
      new NavItemDto('Log In', '', '/users', ''),
    ]);
  }
}
