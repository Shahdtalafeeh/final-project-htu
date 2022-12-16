import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './header/header.component';
import { MatRippleModule } from '@angular/material/core';

const MatImports = [
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,

  RouterModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatRippleModule,
];

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    ...MatImports,
  ],
})
export class HomeModule {}
