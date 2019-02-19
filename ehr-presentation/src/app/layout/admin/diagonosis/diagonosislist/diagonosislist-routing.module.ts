import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagonosislistComponent } from './diagonosislist.component';





const routes: Routes = [
  {
    path: '', component: DiagonosislistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagonosislistRoutingModule { }
