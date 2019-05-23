import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientbarcodeprintComponent } from './patientbarcodeprint.component';

const routes: Routes = [
  {
    path: '', component: PatientbarcodeprintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientbarcodeprintRoutingModule { }
