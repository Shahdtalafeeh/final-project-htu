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
  styleUrls: ['./edit-sector.component.css'],
})
export class EditSectorComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  id: string = '';
  loading = true;
  imgSrc: any;
  color: string = '#c2185b';

  constructor(
    private formBuilder: FormBuilder,
    injector: Injector,
    private _sectorsService: SectorsService,
    private activatedRoute: ActivatedRoute,
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

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result) => {
      if (result['id']) {
        this.id = result['id'];
        this.getSectorById();
      }
    });

  }
  getSectorById() {
    this._sectorsService.getById(this.id).subscribe((result: any) => {
      this.formGroup = this.formBuilder.group({
        sectors: result['sectors'],
        sectorLogo: result['sectorLogo'],
        designColor: result['designColor'],
        parentCategoryName: result['parentCategoryName'],
      });
      this.imgSrc = result['sectorLogo'];

      this.loading = false;
    });
  }
  onUpdateClicked() {
    if (this.formGroup.controls['sectorLogo'].value.name) {
      this.upload();
    } else {
      this.updateSectors();
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
      this.updateSectors();
    });
  }

  updateSectors() {
    this._sectorsService
      .update(this.id, {
        sectors: this.formGroup.controls['sectors'].value,
        sectorLogo: this.formGroup.controls['sectorLogo'].value,
        designColor: this.formGroup.controls['designColor'].value,
        parentCategoryName: this.formGroup.controls['parentCategoryName'].value,
      })
      .then(() => {
        this.back();
      });
  }

  onFileInputChange($event: any) {
    console.log($event);
    this.formGroup.controls['sectorLogo'].setValue($event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.formGroup.controls['sectorLogo'].value);
  }

  onChangeColor(color: string): void {
    this.color = color;
    this.formGroup.controls['designColor'].patchValue(color);
  }
}
