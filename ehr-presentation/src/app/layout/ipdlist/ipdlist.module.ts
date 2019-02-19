import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';

import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { IpdlistRoutingModule } from './ipdlist-routing.module';
import { IpdlistComponent } from './ipdlist.component';


//import { ConfirmationdischargeComponent } from '../components/confirmationdischarge/confirmationdischarge.component';


@NgModule({
    imports: [
        CommonModule,
        IpdlistRoutingModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        IpdlistComponent
    ],
    entryComponents:[]
})
export class IpdlistModule {
    
}
