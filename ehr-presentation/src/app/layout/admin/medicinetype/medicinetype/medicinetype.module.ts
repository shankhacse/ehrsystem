import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MedicinetypeComponent } from './medicinetype.component';
import { MedicinetypeRoutingModule } from './medicinetype-routing.module';









/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    MedicinetypeRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [MedicinetypeComponent],
  entryComponents : [MedicinetypeComponent]
})
export class MedicinetypeModule { }
