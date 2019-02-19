import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagonosisComponent } from './diagonosis.component';




const routes: Routes = [
  {
    path: '', component: DiagonosisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagonosisRoutingModule { }
