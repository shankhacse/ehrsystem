import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpdvisitComponent } from './ipdvisit.component';




const routes: Routes = [
  {
    path: '', component: IpdvisitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdvisitRoutingModule { }
