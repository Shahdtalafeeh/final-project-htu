import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EndUserComponent } from './end-user/end-user.component';

const routes: Routes = [
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'end-user',
    component:EndUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
