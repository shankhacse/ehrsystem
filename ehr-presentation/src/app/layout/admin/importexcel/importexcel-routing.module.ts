import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportexcelComponent } from './importexcel.component';




const routes: Routes = [
  {
    path: '', component: ImportexcelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportexcelRoutingModule { }
