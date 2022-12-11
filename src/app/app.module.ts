import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './core/components/layouts/layouts.module';
import{AngularFireModule}from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import{AngularFireAuthModule}from '@angular/fire/compat/auth';
import { UsersModule } from './pages/users/users.module';
import { StartupsModule } from './pages/startups/startups.module';

@NgModule({
  declarations: [
AppComponent

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
    StartupsModule




  ],
  providers: [


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
