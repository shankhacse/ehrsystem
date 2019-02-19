import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { DiagonosislistRoutingModule } from './diagonosislist-routing.module';
import { DiagonosislistComponent } from './diagonosislist.component';
import { DiagonosisedialogComponent } from '../../components/diagonosisedialog/diagonosisedialog.component';







/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    DiagonosislistRoutingModule,

    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [DiagonosislistComponent, DiagonosisedialogComponent],
  entryComponents : [DiagonosisedialogComponent]
})
export class DiagonosislistModule { }
