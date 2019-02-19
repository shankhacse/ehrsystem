import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PharmacymedicinelistComponent } from './pharmacymedicinelist.component';


const routes: Routes = [
    {
        path: '', component: PharmacymedicinelistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PharmacymedicinelistRoutingModule {
}
