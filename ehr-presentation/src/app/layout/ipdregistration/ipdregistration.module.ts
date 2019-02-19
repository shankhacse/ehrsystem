import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IpdregistrationRoutingModule } from './ipdregistration-routing.module';
import { IpdregistrationComponent } from './ipdregistration.component';
/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */





@NgModule({
  imports: [
    CommonModule,
    IpdregistrationRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  providers:[],
  declarations: [IpdregistrationComponent],
  entryComponents : []
})
export class IpdregistrationModule { }
