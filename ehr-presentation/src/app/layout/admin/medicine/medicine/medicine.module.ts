import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MedicineRoutingModule } from './medicine-routing.module';

import { MedicineComponent } from './medicine.component';




@NgModule({
  imports: [
    CommonModule,
    MedicineRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [MedicineComponent],
  entryComponents : [MedicineComponent]
})
export class MedicineModule { }
