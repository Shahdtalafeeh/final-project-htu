import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { ApproveComponent } from './pages/approve/approve.component';
import { FormComponent } from './pages/form/form.component';
import { PreviewComponent } from './pages/home/preview/preview.component';
import { HomeComponent } from './pages/home/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { LandingComponent } from './pages/home/landing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },


  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/home/landing.module').then((m) => m.LandingModule),
      component:LandingComponent,
      canLoad: [NoAuthGuard],

  },


  {
    path: 'startups',
    loadChildren: () =>
      import('./pages/startups/startups.module').then((m) => m.StartupsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
    canLoad: [NoAuthGuard],
  },
  {
    path: 'sectors',
    loadChildren: () =>
      import('./pages/sectors/sectors.module').then((m) => m.SectorsModule),
    canLoad: [AuthGuard],
  },
  {
    path:'form',
    component:FormComponent,
    canLoad: [AuthGuard],


  },
  {
    path:'approve',
    component:ApproveComponent,
    canLoad: [AuthGuard],

  },


  {
    path:'**',
    redirectTo:'landing',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
