import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { InvestigationlistRoutingModule } from './investigationlist-routing.module';
import { InvestigationlistComponent } from './investigationlist.component';






/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    InvestigationlistRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [InvestigationlistComponent],
  entryComponents : [InvestigationlistComponent]
})
export class InvestigationlistModule { }
