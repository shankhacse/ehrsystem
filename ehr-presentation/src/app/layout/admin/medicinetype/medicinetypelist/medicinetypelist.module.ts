import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { MedicinetypelistComponent } from './medicinetypelist.component';
import { MedicinetypelistRoutingModule } from './medicinetypelist-routing.module';











/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    MedicinetypelistRoutingModule,

    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [MedicinetypelistComponent,],
  entryComponents : [MedicinetypelistComponent,]
})
export class MedicinetypelistModule { }
