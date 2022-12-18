import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

@Component({
  selector: 'app-preview-startup',
  templateUrl: './preview-startup.component.html',
  styleUrls: ['./preview-startup.component.css']
})
export class PreviewStartupComponent implements OnInit {
  id: string=''
  startupName:string=''
      logoImage:string=''
      city:string=''
      sectors:string=''
      founderName:string=''
      numberOfEmployees:number=0
      yearOfEstablishment:number=0
      websiteUrl:string=''
      emailAddress:string=''

    constructor(

      private _startupsService: StartupsService,
      private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe((result)=>{
        if(result['id']){
          this.id=result['id']
        }
      })


      this.getStartupsById()
    }
    getStartupsById(){
      this._startupsService.getById(this.id).subscribe((result:any)=>{
        this.startupName=result['startupName']
        this.logoImage=result['logoImage']
        this.city=result['city']
        this.emailAddress=result['emailAddress']
        this.founderName=result['founderName']
      this.numberOfEmployees=result['numberOfEmployees']
      this.sectors=result['sectors']

      })



    }

}
