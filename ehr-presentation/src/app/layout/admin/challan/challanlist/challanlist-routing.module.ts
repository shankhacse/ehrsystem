import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallanlistComponent } from './challanlist.component';







const routes: Routes = [
  {
    path: '', component: ChallanlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanlistRoutingModule { }
