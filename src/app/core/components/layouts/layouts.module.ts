import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [LayoutComponent,SideNavBarComponent],
  imports: [CommonModule,MatSidenavModule,MatToolbarModule,MatIconModule,MatListModule,RouterModule,MatButtonModule,MatTooltipModule
],exports:[LayoutComponent],
providers: []
})
export class LayoutsModule {}
