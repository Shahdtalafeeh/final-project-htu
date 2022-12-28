import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  constructor(private _usersService: UsersService,
) { }

  ngOnInit(): void {
  this.isLoggedIn$=this._usersService.isLoggedIn$;


  }



}
