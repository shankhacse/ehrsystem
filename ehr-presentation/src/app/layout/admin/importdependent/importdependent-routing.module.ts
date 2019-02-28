import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportdependentComponent } from './importdependent.component';






const routes: Routes = [
  {
    path: '', component: ImportdependentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportdependentRoutingModule { }
