import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
//import { ChallandialogComponent } from '../../components/challandialog/challandialog.component';
import { PatientlistComponent } from './patientlist.component';
import { PatientlistRoutingModule } from './patientlist-routing.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { PatientbarcodedialogComponent } from '../../components/patientbarcodedialog/patientbarcodedialog.component';
import { NgxPrintModule } from 'ngx-print';












@NgModule({
  imports: [
    CommonModule,
    PatientlistRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBarcodeModule ,
    NgxPrintModule
    
    
  ],
  providers:[],
  declarations: [PatientlistComponent,PatientbarcodedialogComponent],
  entryComponents : [PatientlistComponent,PatientbarcodedialogComponent]
})
export class PatientlistModule { }
