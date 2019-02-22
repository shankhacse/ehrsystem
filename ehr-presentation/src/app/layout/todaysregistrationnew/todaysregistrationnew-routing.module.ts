import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodaysregistrationnewComponent } from './todaysregistrationnew.component';

const routes: Routes = [
    {
        path: '', component: TodaysregistrationnewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodaysregistrationnewRoutingModule {
}
