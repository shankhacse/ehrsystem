import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { InvestigationRoutingModule } from './investigation-routing.module';
import { InvestigationComponent } from './investigation.component';






/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    InvestigationRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [InvestigationComponent],
  entryComponents : [InvestigationComponent]
})
export class InvestigationModule { }
