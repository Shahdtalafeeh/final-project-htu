import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SideNavBarComponent } from './side-nav-bar.component';



@NgModule({
  declarations: [SideNavBarComponent],
  imports: [
    CommonModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,

    RouterModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [SideNavBarComponent]

})
export class SideNavBarModule { }
