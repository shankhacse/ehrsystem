import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { sickleaveapprovalRoutingModule } from './sickleaveapproval-routing.module';
import { SickleaveapprovalComponent } from './sickleaveapproval.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApprovedsickleavedetailsdialogComponent } from '../components/approvedsickleavedetailsdialog/approvedsickleavedetailsdialog.component';


@NgModule({
    imports: [
        CommonModule,
        sickleaveapprovalRoutingModule,
        AppMaterialModule,
        FormsModule,
    ReactiveFormsModule
    ],
    declarations: [
        SickleaveapprovalComponent,ApprovedsickleavedetailsdialogComponent
    ],
    entryComponents : [SickleaveapprovalComponent,ApprovedsickleavedetailsdialogComponent]
})
export class sickleaveapprovalModule {
    
}
