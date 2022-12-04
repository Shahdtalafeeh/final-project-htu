import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [LayoutComponent, SideNavBarComponent],
  imports: [CommonModule,MatSidenavModule,MatToolbarModule,MatIconModule,MatListModule
],
providers: []
})
export class LayoutsModule {}
