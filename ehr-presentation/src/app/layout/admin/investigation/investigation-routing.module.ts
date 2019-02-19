import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestigationComponent } from './investigation.component';




const routes: Routes = [
  {
    path: '', component: InvestigationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationRoutingModule { }
