import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';







const appRoutes: Routes = [
 
  { path: 'panel', loadChildren: './layout/layout.module#LayoutModule' },
  { path: '', loadChildren: './login/login.module#LoginModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
  { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' },

  
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
  
})
export class AppRoutingModule { }
