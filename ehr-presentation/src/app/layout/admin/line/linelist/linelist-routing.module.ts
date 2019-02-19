import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinelistComponent } from './linelist.component';







const routes: Routes = [
  {
    path: '', component: LinelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinelistRoutingModule { }
