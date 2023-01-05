import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSectorComponent } from './add-sector/add-sector.component';
import { EditSectorComponent } from './edit-sector/edit-sector/edit-sector.component';
import { PreviewSectorComponent } from './preview-sector/preview-sector.component';
import { SectorsComponent } from './sectors.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-sectors', pathMatch: 'full' },
  { path: 'all-sectors', component: SectorsComponent },
  { path: 'add-sector', component: AddSectorComponent },
  { path: 'edit-sector', component: EditSectorComponent },
  { path: 'preview-sector', component: PreviewSectorComponent },
  { path: '**', redirectTo: 'all-startups', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsRoutingModule {}
