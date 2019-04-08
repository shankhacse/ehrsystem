import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinetypeComponent } from './medicinetype.component';






const routes: Routes = [
  {
    path: '', component: MedicinetypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinetypeRoutingModule { }
