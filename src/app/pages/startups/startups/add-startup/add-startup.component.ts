import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css'],
})
export class AddStartupComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  dropList: Sectors[] = [];
  imgSrc: any;
  selectedImage: any = null;
  sub!: Subscription;
  sub1!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    injector: Injector,
    private _startupsService: StartupsService,
    private _sectorsService: SectorsService,
    private _uploadService: UploadService
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
  onAddClicked() {
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
      console.log();
      this.formGroup.controls['logoImage'].setValue(url);
      this.createStartup();
    });
  }
  createStartup() {
    this._startupsService
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
  onFileInputChange(event: any) {
    this.formGroup.controls['logoImage'].setValue(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.formGroup.controls['logoImage'].value);
  }
  getAllsectors() {
    this.sub1 = this._sectorsService.getAll().subscribe((result) => {
      this.dropList = result;
    });
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
  // ngOnDestroy(): void{
  //   this.sub.unsubscribe()
  //   this.sub1.unsubscribe()
  // }
}
