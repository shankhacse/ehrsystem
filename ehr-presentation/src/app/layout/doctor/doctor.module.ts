import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { DoctorComponent } from './doctor.component';
import { DoctorRoutingModule } from './doctor-routing.module';



@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers:[],
  declarations: [DoctorComponent] ,
  entryComponents : []
})
export class DoctorModule { }
