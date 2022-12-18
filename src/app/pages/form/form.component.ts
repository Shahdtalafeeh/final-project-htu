import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { FormService } from 'src/app/core/services/form/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, injector: Injector,private _formService: FormService) {
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
  onSubmitClicked(){
    this._formService.create({
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
