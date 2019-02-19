import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SymptomslistComponent } from './symptomslist.component';





const routes: Routes = [
  {
    path: '', component: SymptomslistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymptomslistRoutingModule { }
