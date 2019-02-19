import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpddischargeComponent } from './ipddischarge.component';

const routes: Routes = [
  {
    path: '', component: IpddischargeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpddischargeRoutingModule { }
