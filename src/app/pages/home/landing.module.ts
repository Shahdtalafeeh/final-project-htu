import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderModule } from 'src/app/core/components/header/header.module';
import { LandingComponent } from './landing.component';
import { PreviewComponent } from './preview/preview.component';

const MatImports = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  RouterModule,

  MatRippleModule,
  MatListModule,
  MatTooltipModule,
  HeaderModule,
];

@NgModule({
  declarations: [HomeComponent, LandingComponent, PreviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'preview',
        component: PreviewComponent,
      },
    ]),
    ...MatImports,
  ],
})
export class LandingModule {}
