import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { RegistrationreportRoutingModule } from './registrationreport-routing.module';
import { RegistrationreportComponent } from './registrationreport.component';












@NgModule({
  imports: [
    CommonModule,
    RegistrationreportRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  providers:[],
  declarations: [RegistrationreportComponent],
  entryComponents : []
})
export class RegistrationreportModule { }
