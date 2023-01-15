import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MatImports=[MatFormFieldModule,MatInputModule,FormsModule, ReactiveFormsModule,MatButtonModule,MatRadioModule, MatProgressSpinnerModule]


@NgModule({
    declarations: [
        UsersComponent,
        LoginComponent,
        SignupComponent

    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatTabsModule,
        ...MatImports,

    ]
})
export class UsersModule { }
