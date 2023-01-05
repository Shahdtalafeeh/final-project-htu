import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FilterModule } from 'src/app/core/pipes/filter/filter.module';
import { SplitTextModule } from 'src/app/core/pipes/split-text/split-text.module';
import { AddSectorComponent } from './add-sector/add-sector.component';
import { EditSectorComponent } from './edit-sector/edit-sector/edit-sector.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PreviewSectorComponent } from './preview-sector/preview-sector.component';


@NgModule({
  declarations: [
    SectorsComponent,AddSectorComponent, EditSectorComponent, PreviewSectorComponent
  ],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    SplitTextModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    FilterModule,
    ColorPickerModule
  ]
})
export class SectorsModule { }
