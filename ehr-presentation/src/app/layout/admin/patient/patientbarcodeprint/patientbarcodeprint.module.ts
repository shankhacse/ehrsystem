import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
//import { ChallandialogComponent } from '../../components/challandialog/challandialog.component';

import { PatientbarcodeprintComponent } from './patientbarcodeprint.component';
import { PatientbarcodeprintRoutingModule } from './patientbarcodeprint-routing.module';

import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  imports: [
    CommonModule,
    PatientbarcodeprintRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBarcodeModule ,
    NgxPrintModule
    
    
  ],
  providers:[],
  declarations: [PatientbarcodeprintComponent],
  entryComponents : [PatientbarcodeprintComponent]
})
export class PatientbarcodeprintModule { }
