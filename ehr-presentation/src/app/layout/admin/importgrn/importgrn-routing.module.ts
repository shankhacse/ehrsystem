import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportgrnComponent } from './importgrn.component';




const routes: Routes = [
  {
    path: '', component: ImportgrnComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportgrnRoutingModule { }
