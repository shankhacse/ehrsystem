import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientregComponent } from './patientreg.component';


const routes: Routes = [
  {
    path: '', component: PatientregComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientregRoutingModule { }
