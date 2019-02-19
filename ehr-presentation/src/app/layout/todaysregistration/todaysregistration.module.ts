import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {TodaysregistrationRoutingModule  } from './todaysregistration-routing.module';
import { TodaysregistrationComponent } from './todaysregistration.component';
import { AppMaterialModule } from '../../app-material/app-material.module';

@NgModule({
    imports: [
        CommonModule,
        TodaysregistrationRoutingModule,
        AppMaterialModule
    ],
    declarations: [
        TodaysregistrationComponent
    ]
})
export class TodaysregistrationModule {
    
}
