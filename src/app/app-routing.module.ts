import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },{
  path:'auth',
  loadChildren:()=> import('./pages/auth/auth.module').then(m=>m.AuthModule)
},
{
  path:'home',
  loadChildren:()=> import('./pages/home/home.module').then(m=>m.HomeModule)
},
{
  path:'dashboard',
  loadChildren:()=> import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule)
},
{
  path:'products',
  loadChildren:()=> import('./pages/products/products.module').then(m=>m.ProductsModule)
},
{
  path:'**',
  redirectTo:'auth',
  pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
