import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStartupComponent } from './startups/add-startup/add-startup.component';
import { EditStartupComponent } from './startups/edit-startup/edit-startup.component';
import { PreviewStartupComponent } from './startups/preview-startup/preview-startup.component';
import { StartupsComponent } from './startups/startups.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'startups',
    pathMatch:'full'
  },
  {
    path:'startups',
    component:StartupsComponent
  },
  {
    path:'add-startup',
    component: AddStartupComponent
  },
  {

      path:'edit-startup',
      component: EditStartupComponent

  },
  {
    path:'preview-startup',
    component: PreviewStartupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupsRoutingModule { }
