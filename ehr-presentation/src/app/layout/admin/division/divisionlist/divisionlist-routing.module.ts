import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DivisionlistComponent } from './divisionlist.component';






const routes: Routes = [
  {
    path: '', component: DivisionlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivisionlistRoutingModule { }
