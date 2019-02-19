import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpdregistrationComponent } from './ipdregistration.component';



const routes: Routes = [
  {
    path: '', component: IpdregistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdregistrationRoutingModule { }
