import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatienregistrationComponent } from './patienregistration.component';



const routes: Routes = [
  {
    path: '', component: PatienregistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatienregistrationRoutingModule { }
