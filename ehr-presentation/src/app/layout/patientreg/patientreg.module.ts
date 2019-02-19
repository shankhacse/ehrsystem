import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientregRoutingModule } from './patientreg-routing.module';
import { PatientregComponent } from './patientreg.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';







@NgModule({
  imports: [
    CommonModule,
    PatientregRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
 
  declarations: [PatientregComponent]
})
export class PatientregModule { }
