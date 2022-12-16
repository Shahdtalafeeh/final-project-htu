import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from 'src/app/core/interfaces/service.interface';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  centered = false;

services:Service[]=[]
  constructor(private _userService: UsersService,  private _startupservice: StartupsService,
    private route: Router) {

    }

  ngOnInit(): void {
this.getAllstart()

  }
  routingToLogin(){
    if(this._userService.isloggedIn){
    this.route.navigate(['/form'])

  }else{
    this.route.navigate(['/users'])
  }
}
getAllstart() {
  this._startupservice.getAll().subscribe((result) => {
    this.services = result;

  });
}
onCardClicked() {
  this.route.navigate(['/preview-startup']);
}


}
