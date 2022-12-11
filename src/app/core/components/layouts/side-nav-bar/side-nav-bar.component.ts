import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, Observable } from 'rxjs';
import { NavService } from 'src/app/core/services/nav/nav.service';
import { NavMenuDto } from 'src/app/core/dto/nav-menu';
import { UsersService } from 'src/app/core/services/users/users.service';
@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css'],
})
export class SideNavBarComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sideNav!: MatSidenav;

  navServiceList: NavMenuDto = new NavMenuDto('', []);
  constructor(
    private breakpoint: BreakpointObserver,
    private _navService: NavService,
    private _usersService: UsersService,
  ) {}
  isLoggedIn$!: Observable<boolean>;


  ngOnInit(): void {
    this.navServiceList = this._navService.getNavMenu();
    this.isLoggedIn$=this._usersService.isLoggedIn$;
  }
  ngAfterViewInit(): void {
    this.breakpoint
      .observe(['(max-width:800px)'])
      .pipe(delay(1))
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sideNav.mode = 'over';
          this.sideNav.close();
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.open();
        }
      });
  }
  onItemClicked() {
    if (this.sideNav.mode === 'over') {
      this.sideNav.close();
    }
  }


  onLoggedoutClicked() {
    this._usersService.logout()

  }

}
