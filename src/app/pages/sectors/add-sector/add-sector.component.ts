import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent extends AppComponentBase implements OnInit {
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, injector: Injector,private _sectorsService: SectorsService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      sectorName:null,
      sectorLogo:null,
      designColor:null,
      parentCategoryName:null

    })
  }
  onAddClicked(){
    this._sectorsService.create({
      sectorName: this.formGroup.controls['sectorName'].value,
      sectorLogo: this.formGroup.controls['sectorLogo'].value,
      designColor:this.formGroup.controls['designColor'].value,
      parentCategoryName: this.formGroup.controls['parentCategoryName'].value,

    }).then(()=>{
      this.back()
    })

  }

}
