import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './core/components/layouts/layouts.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UsersModule } from './pages/users/users.module';
import { StartupsModule } from './pages/startups/startups.module';
import { FormComponent } from './pages/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ApproveComponent } from './pages/approve/approve.component';
import { SplitTextModule } from './core/pipes/split-text/split-text.module';
import { PreviewStartupComponent } from './pages/preview-startup/preview-startup.component';
import {MatRippleModule} from '@angular/material/core';
import { FilterModule } from './core/pipes/filter/filter.module';


const MatImports = [
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatCheckboxModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  SplitTextModule,
  MatRippleModule,
  FilterModule

];
@NgModule({
  declarations: [AppComponent, FormComponent, ApproveComponent, PreviewStartupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    UsersModule,
    StartupsModule,
    ...MatImports,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
