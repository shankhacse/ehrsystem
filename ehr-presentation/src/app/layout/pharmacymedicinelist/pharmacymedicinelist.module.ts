import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { PharmacymedicinelistRoutingModule } from './pharmacymedicinelist-routing.module';
import { PharmacymedicinelistComponent } from './pharmacymedicinelist.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { IssuedmedicineComponent } from '../partialcomponent/issuedmedicine/issuedmedicine.component';




@NgModule({
    imports: [
        CommonModule,
        PharmacymedicinelistRoutingModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PharmacymedicinelistComponent , IssuedmedicineComponent
    ]
})
export class PharmacymedicinelistModule {
    
}
