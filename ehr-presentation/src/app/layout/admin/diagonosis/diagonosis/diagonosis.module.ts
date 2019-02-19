import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { DiagonosisRoutingModule } from './diagonosis-routing.module';
import { DiagonosisComponent } from './diagonosis.component';






/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    DiagonosisRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [DiagonosisComponent],
  entryComponents : [DiagonosisComponent]
})
export class DiagonosisModule { }
