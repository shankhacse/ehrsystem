import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestigationlistComponent } from './investigationlist.component';




const routes: Routes = [
  {
    path: '', component: InvestigationlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationlistRoutingModule { }
