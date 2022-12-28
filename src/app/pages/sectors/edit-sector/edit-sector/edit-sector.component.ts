import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.component.html',
  styleUrls: ['./edit-sector.component.css']
})
export class EditSectorComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  id: string = '';
  loading=true
  imgSrc: string = '/assets/img/uploadImg.jpg';
  selectedImage: any = null;

  constructor(
    private formBuilder: FormBuilder,
    injector: Injector,
    private _sectorsService: SectorsService,
    private activatedRoute: ActivatedRoute,
    private _uploadService: UploadService
  ) {
    super(injector);
  }

  ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['id']){
        this.id=result['id']
      }
    })
    this.formGroup = this.formBuilder.group({
      sectors:null,
      sectorLogo:null,
      designColor:null,
      parentCategoryName:null
    });

    this.getProductById()
  }
  getProductById(){
 this._sectorsService.getById(this.id).subscribe((result:any)=>{
      this.formGroup = this.formBuilder.group({
        sectors: result['sectors'],
        sectorLogo: result['sectorLogo'],
        designColor:result['designColor'],
        parentCategoryName: result['parentCategoryName'],
    })
    this.loading=false;
  })
  }
  onUpdateClicked() {
this._uploadService
    .upload(this.selectedImage)
      .pipe(
        finalize(() => {
          this._uploadService.getDownloadURL().subscribe((url) => {
            this._sectorsService
            .update(this.id, {
              sectors: this.formGroup.controls['sectors'].value,
              sectorLogo: this.formGroup.controls['sectorLogo']=url,
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
