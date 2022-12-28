import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStartupsComponent } from './all-startups.component';
import { PreviewAllstartupsComponent } from './preview-allstartups/preview-allstartups.component';

const routes: Routes = [
  {
path:'',
redirectTo:'all',
pathMatch:'full'
  },
  {
    path:'all',
    component:AllStartupsComponent,

  },

  {
    path:'preview-all',
    component:PreviewAllstartupsComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllStartupsRoutingModule { }
