import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinetypelistComponent } from './medicinetypelist.component';







const routes: Routes = [
  {
    path: '', component: MedicinetypelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinetypelistRoutingModule { }
