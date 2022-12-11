import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './core/services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn$!: Observable<boolean>;
  constructor(private _usersService: UsersService){}
  ngOnInit(): void {
    this.isLoggedIn$=this._usersService.isLoggedIn$;
  }
}
