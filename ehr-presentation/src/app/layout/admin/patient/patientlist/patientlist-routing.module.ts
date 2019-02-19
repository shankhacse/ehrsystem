import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientlistComponent } from './patientlist.component';









const routes: Routes = [
  {
    path: '', component: PatientlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientlistRoutingModule { }
