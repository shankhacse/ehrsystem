import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { SymptomsRoutingModule } from './symptoms-routing.module';
import { SymptomsComponent } from './symptoms.component';






/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    SymptomsRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [SymptomsComponent],
  entryComponents : [SymptomsComponent]
})
export class SymptomsModule { }
