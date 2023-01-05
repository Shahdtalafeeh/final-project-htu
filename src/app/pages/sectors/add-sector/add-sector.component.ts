import { Component, Injector, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css'],
})
export class AddSectorComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  imgSrc: any;
  color: string = '#c2185b';
  constructor(
    private formBuilder: FormBuilder,
    injector: Injector,
    private _sectorsService: SectorsService,
    private storage: AngularFireStorage,
    private _uploadService: UploadService
  ) {
    super(injector);
    this.formGroup = this.formBuilder.group({
      sectors: null,
      sectorLogo: null,
      designColor: null,
      parentCategoryName: null,
    });
  }

  ngOnInit(): void {}
  onAddClicked() {
    if (this.formGroup.controls['sectorLogo'].value) {
      this.upload();
    } else {
      this.createSector();
    }
  }

  upload() {
    this._uploadService
      .upload(this.formGroup.controls['sectorLogo'].value)
      .subscribe((file) => {
        if (file?.metadata) {
          this.getDownloadURL();
        }
      });
  }
  getDownloadURL() {
    this._uploadService.getDownloadURL().subscribe((url) => {
      console.log();
      this.formGroup.controls['sectorLogo'].setValue(url);
      this.createSector();
    });
  }

  createSector() {
    this._sectorsService
      .create({
        sectors: this.formGroup.controls['sectors'].value,
        sectorLogo: this.formGroup.controls['sectorLogo'].value,
        designColor: this.formGroup.controls['designColor'].value,
        parentCategoryName: this.formGroup.controls['parentCategoryName'].value,
      })
      .then(() => {
        this.back();
      });
  }
  onFileInputChange(event: any) {
    this.formGroup.controls['sectorLogo'].setValue(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.formGroup.controls['sectorLogo'].value);
  }
  onChangeColor(color: string): void {
    this.color = color;
    this.formGroup.controls['designColor'].patchValue(color);
  }
}
