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
      new NavItemDto('Startups','category','/startups','admin'),
      new NavItemDto('Form','category','/form','endUser'),
      new NavItemDto('Approve','notification_add','/approve','admin'),


    ])
  }
  getToolBarMenu(){
    return new NavMenuDto('ToolBarMenu',[
      new NavItemDto('Home','home','/home',''),
      new NavItemDto('Sign in','group','/users',''),




    ])
  }
}
