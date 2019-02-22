import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SickleaveregisterComponent } from './sickleaveregister.component';



const routes: Routes = [
  {
    path: '', component: SickleaveregisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SickleaveregisterRoutingModule { }
