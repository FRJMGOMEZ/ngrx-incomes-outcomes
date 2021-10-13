import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './core/guards/auth.guard';

const routes:Routes = [
/*    {
   path: 'auth',
   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }, */
  {
    path:'login', component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path: '',
    component: DashboardComponent,
    children:dashboardRoutes,
    canActivate:[AuthGuard]
  },
  {
   path:'**',component:DashboardComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
