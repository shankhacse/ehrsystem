import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
//import { ChallandialogComponent } from '../../components/challandialog/challandialog.component';
import { PatientlistComponent } from './patientlist.component';
import { PatientlistRoutingModule } from './patientlist-routing.module';












@NgModule({
  imports: [
    CommonModule,
    PatientlistRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [PatientlistComponent],
  entryComponents : [PatientlistComponent]
})
export class PatientlistModule { }
