import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { TodaysregistrationnewRoutingModule } from './todaysregistrationnew-routing.module';
import { TodaysregistrationnewComponent } from './todaysregistrationnew.component';



@NgModule({
    imports: [
        CommonModule,
        TodaysregistrationnewRoutingModule,
        AppMaterialModule
    ],
    declarations: [
        TodaysregistrationnewComponent
    ]
})
export class TodaysregistrationnewModule {
    
}
