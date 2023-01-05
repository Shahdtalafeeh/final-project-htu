import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/core/services/form/form.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  id: string='';
  startupName: string='';
      logoImage:any
      city:string=''
      sectors:string=''
      founderName:string=''
      numberOfEmployees:number=0
      yearOfEstablishment:number=0
      websiteUrl:string=''
      emailAddress:string=''

     sub!:Subscription;
     sub1!:Subscription;


    constructor(

      private _formService: FormService,
      private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe((result)=>{
        if(result['id']){
          this.id=result['id']
        }
      })
console.log(this.getStartupsById())

    }
    getStartupsById(){
      this._formService.getById(this.id).subscribe((result:any)=>{
        this.startupName=result['startupName']
        this.logoImage=result['logoImage']
        this.city=result['city']
        this.emailAddress=result['emailAddress']
        this.founderName=result['founderName']
      this.numberOfEmployees=result['numberOfEmployees']
      this.sectors=result['sectors']
      this.websiteUrl=result['websiteUrl']

      })


    }
}
