import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpdpreprationComponent } from './opdprepration.component';




const routes: Routes = [
  {
    path: '', component: OpdpreprationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdpreprationRoutingModule { }
