import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  styleUrls: ['./add-startup.component.css']
})
export class AddStartupComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  dropList: Sectors[] = [];
  imgSrc: string = '/assets/img/uploadImg.jpg';
  selectedImage: any = null;
  sub!: Subscription;
  sub1!: Subscription;
  constructor(private formBuilder: FormBuilder, injector: Injector,private _startupsService: StartupsService, private storage: AngularFireStorage, private _sectorsService: SectorsService, private _uploadService: UploadService) {
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
    this.getAllsectors()
  }
  onAddClicked(){
    this.sub =this._uploadService
    .upload(this.selectedImage)
      .pipe(
        finalize(() => {
          this._uploadService.getDownloadURL().subscribe((url) => {
            this._startupsService
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
  getAllsectors() {
    this.sub1 = this._sectorsService.getAll().subscribe((result) => {
      this.dropList = result;
    });
  }
  // ngOnDestroy(): void{
  //   this.sub.unsubscribe()
  //   this.sub1.unsubscribe()
  // }

}
