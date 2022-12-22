import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveComponent } from './approve.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'approve',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveRoutingModule { }
