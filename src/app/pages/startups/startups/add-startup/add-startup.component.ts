import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { AppComponentBase } from 'src/app/core/base/app-component-base';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css']
})
export class AddStartupComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, injector: Injector,private _startupsService: StartupsService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      startupName:null,
      logoImage:null,
      city:null,
      sectors:null,
      founderName:null,
      numberOfEmployees:null,
      yearOfEstablishment:null,
      websiteUrl:null,
      emailAddress:null,

    })
  }
  onAddClicked(){
    this._startupsService.create({
      startupName: this.formGroup.controls['startupName'].value,
      logoImage: this.formGroup.controls['logoImage'].value,
      city:this.formGroup.controls['city'].value,
      sectors: this.formGroup.controls['sectors'].value,
      founderName: this.formGroup.controls['founderName'].value,
      numberOfEmployees: this.formGroup.controls['numberOfEmployees'].value,
      yearOfEstablishment: this.formGroup.controls['yearOfEstablishment'].value,
      websiteUrl: this.formGroup.controls['websiteUrl'].value,
      emailAddress: this.formGroup.controls['emailAddress'].value,

    }).then(()=>{
      this.back()
    })

  }
}
