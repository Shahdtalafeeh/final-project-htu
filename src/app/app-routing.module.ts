import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { ApproveComponent } from './pages/approve/approve.component';
import { FormComponent } from './pages/form/form.component';

import { LandingComponent } from './pages/landing/landing.component';
import { SectorsComponent } from './pages/sectors/sectors.component';
import { StartupsComponent } from './pages/startups/startups/startups.component';
import { AllStartupsComponent } from './shared/all-startups/all-startups.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },

  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingModule),
    component: LandingComponent,
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
    path: 'form',
    loadChildren: () =>
      import('./pages/form/form.module').then((m) => m.FormModule),
    component: FormComponent,
    canLoad: [AuthGuard],
  },
  {
    path: 'approve',
    loadChildren: () =>
      import('./pages/approve/approve.module').then((m) => m.ApproveModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'all-startups',
    loadChildren: () =>
      import('./shared/all-startups/all-startups.module').then(
        (m) => m.AllStartupsModule
      ),
    canLoad: [AuthGuard],
  },
   {
    path: '**',
    redirectTo: '/landing',
    pathMatch: 'full',
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
