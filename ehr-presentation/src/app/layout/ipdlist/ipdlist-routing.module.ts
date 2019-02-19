import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpdlistComponent } from './ipdlist.component';

const routes: Routes = [
    {
        path: '', component: IpdlistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IpdlistRoutingModule {
}
