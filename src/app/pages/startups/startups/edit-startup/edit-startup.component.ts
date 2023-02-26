import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';
import { Location } from '@angular/common';
import { URL } from '@angular/fire/compat/database';

@Component({
  selector: 'app-edit-startup',
  templateUrl: './edit-startup.component.html',
  styleUrls: ['./edit-startup.component.css'],
})
export class EditStartupComponent  implements OnInit {
  id: string = '';
  formGroup: FormGroup;
  imgSrc: any;
  sub1!:Subscription;
  dropList!: Sectors[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _startupService: StartupsService,
    private _uploadService: UploadService,
    private location: Location,
    private formBuilder: FormBuilder,
    private _sectorsService: SectorsService
  ) {
    this.formGroup = this.formBuilder.group({
      startupName: [null, Validators.required],
      logoImage: null,
      city: null,
      sectors: [null ,Validators.required],
     founderName: [null, Validators.required],
      numberOfEmployees: null,
      yearOfEstablishment: null,
      websiteUrl: [null, Validators.required],
      emailAddress: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result) => {
      if (result['id']) {
        this.id = result['id'];
        this.getById();
      }
    });
   this.getAllsectors()
  }

  getErrorMessage(control: any) {
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'You must enter a value';
      }
      if (control.hasError('email')) {
        return 'Not a valid email';
      }
    }
    return '';
  }


  getById() {
    this._startupService.getById(this.id).subscribe((result:any) => {
      this.formGroup = this.formBuilder.group({
        startupName: [result['startupName'],[Validators.required]],
        logoImage: result['logoImage'],
        city:result['city'],
        sectors:[result['sectors'],[Validators.required]],
        founderName: [result['founderName'],[Validators.required]],
        numberOfEmployees: result['numberOfEmployees'],
        yearOfEstablishment:result['yearOfEstablishment'],
        websiteUrl: [result['websiteUrl'], [Validators.required]],
        emailAddress: [result['emailAddress'], [Validators.email, Validators.required]]
      })
      this.imgSrc=result['logoImage']

    });
  }


  onUpdateClicked() {
    if (this.formGroup.invalid) {
      this.validateFormGroup();
    } else {
      if (this.formGroup.controls['logoImage'].value.name) {
        this.upload();
      } else {
        this.updateStartup();
      }
    }

  }


  upload() {
    this._uploadService
      .upload(this.formGroup.controls['logoImage'].value)
      .subscribe((file) => {
        if (file?.metadata) {
          this.getDownloadURL();
        }
      });
  }

  getDownloadURL() {
    this._uploadService.getDownloadURL().subscribe((url) => {
      this.formGroup.controls['logoImage'].setValue(url);
      this.updateStartup();
    });
  }

  updateStartup() {
    this._startupService
      .update(this.id, {
        startupName: this.formGroup.controls['startupName'].value,
        logoImage: this.formGroup.controls['logoImage'].value,
        city:this.formGroup.controls['city'].value,
        sectors: this.formGroup.controls['sectors'].value ,
       founderName: this.formGroup.controls['founderName'].value,
        numberOfEmployees: this.formGroup.controls['numberOfEmployees'].value,
        yearOfEstablishment: this.formGroup.controls['yearOfEstablishment'].value,
        websiteUrl: this.formGroup.controls['websiteUrl'].value,
        emailAddress: this.formGroup.controls['emailAddress'].value,

      })
      .then(() => {
        this.location.back();
      });
  }

  onFileInputChange($event: any) {
    console.log($event);
    this.formGroup.controls['logoImage'].setValue($event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.formGroup.controls['logoImage'].value);
    console.log(this.formGroup.controls['logoImage'].value)
  }
  getAllsectors() {
  this._sectorsService.getAll().subscribe((result) => {
      this.dropList=result

    });
  }
  validateFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  back(){
    this.location.back()
  }
}
