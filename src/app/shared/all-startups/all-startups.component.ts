import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { Service } from 'src/app/core/interfaces/service.interface';
import { PreviewService } from 'src/app/core/services/preview/preview.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-all-startups',
  templateUrl: './all-startups.component.html',
  styleUrls: ['./all-startups.component.css']
})
export class AllStartupsComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  sub1!: Subscription;
  isLoggedIn$!: Observable<boolean>;
  centered = false;
sectors: Sectors[]=[]
services:Service[]=[]
  constructor(private _userService: UsersService,  private _startupservice: StartupsService,
    private route: Router,private _preview: PreviewService, private _sectorservice: SectorsService) {

    }

  ngOnInit(): void {
this.getAllstart()
this.getAllsectors()

  }

getAllstart() {
 this.sub = this._startupservice.getAll().subscribe((result) => {
    this.services = result;

  });
}
onCardClicked(id:string) {

  this.route.navigate(['/all-startups/preview-all'],{
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
  this.sub.unsubscribe()
  this.sub1.unsubscribe()
}

}
