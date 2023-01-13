import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Startups } from 'src/app/core/interfaces/startups.interface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent
  extends AppComponentBase
  implements OnInit, OnDestroy
{
  formGroup!: FormGroup;
  dropList: Startups[] = [];
  imgSrc: any ;
  selectedImage: any = null;
  sub!: Subscription;
  sub1!: Subscription;
  sub2!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    injector: Injector,
    private _sectorservice: SectorsService,
    private _uploadService: UploadService,
  ) {
    super(injector);
    this.formGroup = this.formBuilder.group({
      startupName: [null, Validators.required],
      logoImage: null,
      city: null,
      sectors: [null, Validators.required],
      founderName: [null, Validators.required],
      numberOfEmployees: null,
      yearOfEstablishment: null,
      websiteUrl: [null, Validators.required],
      emailAddress: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getAllsectors();
  }
  onSubmitClicked() {
    if (this.formGroup.invalid) {
      this.validatorFormGroup();
    } else {
      if (this.formGroup.controls['logoImage'].value) {
        this.upload();
      } else {
        this.createStartup();
      }
    }
  }
  upload() {
    this.sub = this._uploadService
      .upload(this.formGroup.controls['logoImage'].value)
      .subscribe((file) => {
        if (file?.metadata) {
          this.getDownloadURL();
        }
      });
  }

  getDownloadURL() {
    this.sub1 = this._uploadService.getDownloadURL().subscribe((url) => {
      this.formGroup.controls['logoImage'].setValue(url);
      this.createStartup();
    });
  }

  createStartup() {
    this.formService
      .create({
        startupName: this.formGroup.controls['startupName'].value,
        logoImage: this.formGroup.controls['logoImage'].value,
        city: this.formGroup.controls['city'].value,
        sectors: this.formGroup.controls['sectors'].value,
        founderName: this.formGroup.controls['founderName'].value,
        numberOfEmployees: this.formGroup.controls['numberOfEmployees'].value,
        yearOfEstablishment:
          this.formGroup.controls['yearOfEstablishment'].value,
        websiteUrl: this.formGroup.controls['websiteUrl'].value,
        emailAddress: this.formGroup.controls['emailAddress'].value,
      })
      .then(() => {
        this.back();
      });
  }

  getAllsectors() {
    this.sub2 = this._sectorservice.getAll().subscribe((result) => {
      this.dropList = result;
    });
  }
  selectImage(event: any) {
      this.formGroup.controls['logoImage'].setValue(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => (this.imgSrc = reader.result);
      reader.readAsDataURL(this.formGroup.controls['logoImage'].value);




  }
  validatorFormGroup() {
    Object.keys(this.formGroup.controls).forEach((field) => {
      const control = this.formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
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


  ngOnDestroy() {
    if(this.sub && this.sub1 && this.sub2){
      this.sub.unsubscribe();
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
    }

  }
}
