import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './pages/home/header/header.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { ApproveComponent } from './pages/approve/approve.component';
import { FormComponent } from './pages/form/form.component';
import { PreviewStartupComponent } from './pages/preview-startup/preview-startup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),

      canLoad: [NoAuthGuard],

  },

  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./pages/dashboard/dashboard.module').then(
  //       (m) => m.DashboardModule
  //     ),
  //   canLoad: [AuthGuard],
  // },
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
    path:'header',
    component: HeaderComponent,
    canLoad: [NoAuthGuard],
  },
  {
path:'preview-startup',
component:PreviewStartupComponent,
canLoad:[NoAuthGuard]
  },
  {
    path:'**',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
