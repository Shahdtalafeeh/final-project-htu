import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './end-user/login/login.component';
import { SignupComponent } from './end-user/signup/signup.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {path:'',
  redirectTo: 'users',
  pathMatch: 'full',},
{
path:'users',
component:UsersComponent

},

{
  path:'login',
  component: LoginComponent
},
{
  path:'signup',
  component: SignupComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
