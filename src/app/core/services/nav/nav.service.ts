import { Injectable } from '@angular/core';
import { NavItemDto } from '../../dto/nav-item';
import { NavMenuDto } from '../../dto/nav-menu';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }
  getNavMenu(){
    return new NavMenuDto('NavMenu',[
      new NavItemDto('Home','home','/home',''),
      new NavItemDto('Dashboard','dashboard','/dashboard','admin'),
      new NavItemDto('Startups','category','/startups','admin'),
      new NavItemDto('Startups','category','/startups','endUser'),


    ])
  }
  getToolBarMenu(){
    return new NavMenuDto('ToolBarMenu',[
      new NavItemDto('Home','home','/home',''),
      new NavItemDto('Users','group','/users',''),


    ])
  }
}
