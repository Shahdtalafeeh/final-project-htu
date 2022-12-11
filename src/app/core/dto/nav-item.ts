export class NavItemDto {
  displayName: string;
  icon: string;
  route: string;
  children!: NavItemDto[];
  roll: string;
  constructor(
    displayName: string,
    icon: string,
    route: string,
    roll:string,
    children?: NavItemDto[]
  ) {
    this.displayName = displayName;
    this.icon = icon;
    this.route = route;
    this.roll = roll;

    this.children = children ? children : [];
  }
}
