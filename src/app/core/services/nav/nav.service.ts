import { Injectable } from '@angular/core';
import { NavItemDto } from '../../dto/nav-item';
import { NavMenuDto } from '../../dto/nav-menu';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private _usersService: UsersService) { }
  getNavMenu(){
    return new NavMenuDto('NavMenu',[
      new NavItemDto('All-Startups','category','/all-startups',''),


      new NavItemDto('Startups','category','/startups','admin'),
      new NavItemDto('Request','category','/form','endUser'),
      new NavItemDto('Approval','notification_add','/approve','admin'),
      new NavItemDto('Sectors','segment','/sectors','admin'),


    ])
  }
  getToolBarMenu(){
      return new NavMenuDto('ToolBarMenu',[
        new NavItemDto('Home','home','/landing/home',''),
        new NavItemDto('Log In','group','/users',''),
        new NavItemDto('Join','add','/users',''),





      ])
    }




}
