import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationreportComponent } from './registrationreport.component';





const routes: Routes = [
  {
    path: '', component: RegistrationreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationreportRoutingModule { }
