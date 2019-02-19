import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MedicinelistRoutingModule } from './medicinelist-routing.module';
import { MedicinelistComponent } from './medicinelist.component';
import { MedicinedialogComponent } from '../../components/medicinedialog/medicinedialog.component';










/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    MedicinelistRoutingModule,

    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [MedicinelistComponent,MedicinedialogComponent],
  entryComponents : [MedicinedialogComponent]
})
export class MedicinelistModule { }
