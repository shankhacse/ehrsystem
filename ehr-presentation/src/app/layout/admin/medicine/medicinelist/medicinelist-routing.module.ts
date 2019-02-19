import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinelistComponent } from './medicinelist.component';





const routes: Routes = [
  {
    path: '', component: MedicinelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinelistRoutingModule { }
