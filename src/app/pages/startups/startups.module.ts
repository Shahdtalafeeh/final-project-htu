import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupsComponent } from './startups/startups.component';
import { AddStartupComponent } from './startups/add-startup/add-startup.component';
import { EditStartupComponent } from './startups/edit-startup/edit-startup.component';
import { PreviewStartupComponent } from './startups/preview-startup/preview-startup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SplitTextModule } from 'src/app/core/pipes/split-text/split-text.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { StartupsRoutingModule } from './startups-routing.module';
 const MatImports=[ MatFormFieldModule,
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
  MatSnackBarModule,
  MatSelectModule,]

@NgModule({
  declarations: [
    StartupsComponent,
    AddStartupComponent,
     EditStartupComponent,
     PreviewStartupComponent
  ],
  imports: [
    CommonModule,
StartupsRoutingModule,
   ...MatImports,


  ],
})
export class StartupsModule { }
