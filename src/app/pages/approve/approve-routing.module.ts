import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveComponent } from './approve.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'approve',
    pathMatch: 'full',
  },
  { path: 'approve', component: ApproveComponent },

  {
    path: 'preview-request',
    component: PreviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveRoutingModule {}
