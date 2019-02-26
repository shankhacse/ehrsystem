import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { TodaysregistrationnewRoutingModule } from './todaysregistrationnew-routing.module';
import { TodaysregistrationnewComponent } from './todaysregistrationnew.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        TodaysregistrationnewRoutingModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule 
    ],
    declarations: [
        TodaysregistrationnewComponent
    ]
})
export class TodaysregistrationnewModule {
    
}
