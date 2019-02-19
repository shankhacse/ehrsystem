import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SickleaveapprovalComponent } from './sickleaveapproval.component';
//import { TodaysregistrationComponent } from './todaysregistration.component';
//SickleaveapprovalComponent

const routes: Routes = [
    {
        path: '', component: SickleaveapprovalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class sickleaveapprovalRoutingModule {
}
