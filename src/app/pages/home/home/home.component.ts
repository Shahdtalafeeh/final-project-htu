import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { Preview } from 'src/app/core/interfaces/preview.interface';
import { Startups } from 'src/app/core/interfaces/startups.interface';
import { PreviewService } from 'src/app/core/services/preview/preview.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
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
sectors: Sectors[]=[]
startups:Preview[]=[]
  sub!: Subscription;
  sub1!: Subscription;

  constructor(private _userService: UsersService,  private _startupservice: StartupsService,
    private route: Router, private _sectorservice: SectorsService) {

    }

  ngOnInit(): void {
this.getAllstart()
this.getAllsectors()


  }
  routingToLogin(){
    if(this._userService.isloggedIn){
    this.route.navigate(['/form'])

  }else{
    this.route.navigate(['/users'])
  }
}
getAllstart() {
 this.sub = this._startupservice.getAll().subscribe((result) => {
    this.startups = result;

  });
}
onCardClicked(id:string) {

  this.route.navigate(['/landing/preview'],{
    queryParams:{
      id:id,
    }
    })
}
getAllsectors() {
 this.sub1 = this._sectorservice.getAll().subscribe((result) => {
    this.sectors =result



  });
}
ngOnDestroy(){
  if(this.sub && this.sub1){
    this.sub.unsubscribe()
    this.sub1.unsubscribe()
  }


}



}
