import { NavItemDto } from "./nav-item";

export class NavMenuDto{
  displayName='';
  children:NavItemDto[]=[];

  constructor(displayname:string, children:NavItemDto[]){
this.displayName=displayname
this.children=children
  }
}
