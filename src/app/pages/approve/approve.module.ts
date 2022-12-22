import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveComponent } from './approve.component';

import { ApproveRoutingModule } from './approve-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SplitTextModule } from 'src/app/core/pipes/split-text/split-text.module';
const MatImports = [
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  SplitTextModule,
  MatRippleModule,
  MatSelectModule

];

@NgModule({
  declarations: [ApproveComponent],
  imports: [
    CommonModule,
    ApproveRoutingModule,
    ...MatImports
  ]
})
export class ApproveModule { }
