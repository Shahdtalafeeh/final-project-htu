import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  constructor(private _usersService: UsersService){}
  ngOnInit(): void {
    this.isLoggedIn$=this._usersService.isLoggedIn$;

  }

}
