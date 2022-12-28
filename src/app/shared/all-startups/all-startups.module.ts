import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStartupsComponent } from './all-startups.component';
import { MatCardModule } from '@angular/material/card';
import { PreviewAllstartupsComponent } from './preview-allstartups/preview-allstartups.component';
import { AllStartupsRoutingModule } from './all-startups-routing.module';


@NgModule({
  declarations: [
    AllStartupsComponent,
    PreviewAllstartupsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    AllStartupsRoutingModule
  ]
})
export class AllStartupsModule { }
