import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { MedicineissueComponent } from './medicineissue.component';
import { MedicineissueRoutingModule } from './medicineissue-routing.module';
/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    MedicineissueRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers:[],
  declarations: [MedicineissueComponent ] ,
  entryComponents : []
})
export class MedicineissueModule { }
