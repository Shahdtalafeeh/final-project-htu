export class NavItemDto{
  displayName:string;
  icon:string;
  route:string;
  children!: NavItemDto[];

  constructor(displayName:string,icon:string,
    route:string,
    children?: NavItemDto[],){
      this.displayName=displayName
      this.icon=icon
      this.route=route
      this.children=children? children:[]
  }
}

