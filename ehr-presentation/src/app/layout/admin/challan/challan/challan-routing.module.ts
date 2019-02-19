import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallanComponent } from './challan.component';





const routes: Routes = [
  {
    path: '', component: ChallanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanRoutingModule { }
