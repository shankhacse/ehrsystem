import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { ChallanComponent } from './challan.component';
import { ChallanRoutingModule } from './challan-routing.module';









/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    ChallanRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [ChallanComponent],
  entryComponents : [ChallanComponent]
})
export class ChallanModule { }
