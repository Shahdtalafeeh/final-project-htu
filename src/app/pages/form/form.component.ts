import { Component, Injector, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Startups } from 'src/app/core/interfaces/startups.interface';
import { FormService } from 'src/app/core/services/form/form.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  dropList: Startups[] = [];
  fileName = '';
  imgSrc: string = '/assets/img/uploadImg.jpg';
  selectedImage: any = null;

  constructor(
    private formBuilder: FormBuilder,
    injector: Injector,
    private _formService: FormService,
    private _sectorservice: SectorsService,
    private storage: AngularFireStorage
  ) {
    super(injector);
  }

  ngOnInit(): void {
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
    this.getAllsectors();
  }
  onSubmitClicked() {
    if (this.formGroup.invalid) {
      this.validatorFormGroup();
    } else {
      var filePath = `logos/${this.selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this._formService
                .create({
                  startupName: this.formGroup.controls['startupName'].value,
                  logoImage: (this.formGroup.controls['logoImage'] = url),
                  city: this.formGroup.controls['city'].value,
                  sectors: this.formGroup.controls['sectors'].value,
                  founderName: this.formGroup.controls['founderName'].value,
                  numberOfEmployees:
                    this.formGroup.controls['numberOfEmployees'].value,
                  yearOfEstablishment:
                    this.formGroup.controls['yearOfEstablishment'].value,
                  websiteUrl: this.formGroup.controls['websiteUrl'].value,
                  emailAddress: this.formGroup.controls['emailAddress'].value,
                })
                .then(() => {
                  this.back();
                });
            });
          })
        )
        .subscribe();
    }
  }
  getAllsectors() {
    this._sectorservice.getAll().subscribe((result) => {
      this.dropList = result;
    });
  }
  selectImage(event: any) {
    if (event.target.value && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/uploadImg.jpg';
      this.selectedImage = null;
    }
  }
  validatorFormGroup() {
    Object.keys(this.formGroup.controls).forEach((field) => {
      const control = this.formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  getEmailErrorMessage() {
    if (this.emailAddress.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailAddress.hasError('emailAddress')
      ? 'Not a valid email'
      : '';
  }

  get emailAddress() {
    return this.formGroup.controls['emailAddress'] as FormControl;
  }

  get startupName() {
    return this.formGroup.controls['startupName'] as FormControl;
  }

  get sectors() {
    return this.formGroup.controls['sectors'] as FormControl;
  }
  get founderName() {
    return this.formGroup.controls['founderName'] as FormControl;
  }

  get websiteUrl() {
    return this.formGroup.controls['websiteUrl'] as FormControl;
  }
}
