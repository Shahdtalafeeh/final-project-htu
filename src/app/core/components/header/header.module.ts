import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

const MatImports=[ MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  RouterModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatRippleModule,]

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ...MatImports
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
