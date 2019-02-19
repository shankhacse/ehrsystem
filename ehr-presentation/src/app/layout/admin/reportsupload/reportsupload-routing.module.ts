import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsuploadComponent } from './reportsupload.component';




const routes: Routes = [
  {
    path: '', component: ReportsuploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsuploadRoutingModule { }
