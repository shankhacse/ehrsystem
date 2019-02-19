import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicineissueComponent } from './medicineissue.component';

const routes: Routes = [
  {
    path: '', component: MedicineissueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineissueRoutingModule { }
