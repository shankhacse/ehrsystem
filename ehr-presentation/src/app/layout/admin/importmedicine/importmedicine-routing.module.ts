import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportmedicineComponent } from './importmedicine.component';






const routes: Routes = [
  {
    path: '', component: ImportmedicineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportmedicineRoutingModule { }
