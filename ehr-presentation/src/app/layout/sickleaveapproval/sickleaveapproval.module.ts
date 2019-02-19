import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { sickleaveapprovalRoutingModule } from './sickleaveapproval-routing.module';
import { SickleaveapprovalComponent } from './sickleaveapproval.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        sickleaveapprovalRoutingModule,
        AppMaterialModule,
        FormsModule,
    ReactiveFormsModule
    ],
    declarations: [
        SickleaveapprovalComponent
    ]
})
export class sickleaveapprovalModule {
    
}
