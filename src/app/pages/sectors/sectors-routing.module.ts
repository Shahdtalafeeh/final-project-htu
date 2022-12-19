import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSectorComponent } from './add-sector/add-sector.component';
import { SectorsComponent } from './sectors.component';

const routes: Routes = [
  {path:'',
redirectTo:'sectors',
pathMatch:'full'},
  {
    path:'sectors',
    component:SectorsComponent
  },
  {path:'add-sector',
component: AddSectorComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorsRoutingModule { }
