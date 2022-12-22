import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStartupsRoutingModule } from './all-startups-routing.module';
import { AllStartupsComponent } from './all-startups.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AllStartupsComponent
  ],
  imports: [
    CommonModule,
    AllStartupsRoutingModule,
    MatCardModule
  ]
})
export class AllStartupsModule { }
