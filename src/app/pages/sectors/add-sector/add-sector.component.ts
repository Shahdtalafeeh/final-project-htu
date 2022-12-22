import { Component, Injector, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  fileName = '';

  imgSrc: string = '/assets/img/uploadImg.jpg';
  selectedImage: any = null;
  constructor(private formBuilder: FormBuilder, injector: Injector,private _sectorsService: SectorsService, private storage: AngularFireStorage) {
    super(injector);
  }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      sectors:null,
      sectorLogo:null,
      designColor:null,
      parentCategoryName:null

    })
  }
  onAddClicked(){
   const filePath = `sectors-Logos/${this.selectedImage.name
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
            this._sectorsService
              .create({
                sectors: this.formGroup.controls['sectors'].value,
                sectorLogo: this.formGroup.controls['sectorLogo']= url,
                designColor:this.formGroup.controls['designColor'].value,
                parentCategoryName: this.formGroup.controls['parentCategoryName'].value,
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


}
