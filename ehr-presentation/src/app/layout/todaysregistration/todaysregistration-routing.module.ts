import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodaysregistrationComponent } from './todaysregistration.component';

const routes: Routes = [
    {
        path: '', component: TodaysregistrationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodaysregistrationRoutingModule {
}
