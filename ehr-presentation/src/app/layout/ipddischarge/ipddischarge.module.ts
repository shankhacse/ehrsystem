import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IpddischargeRoutingModule } from './ipddischarge-routing.module';
import { IpddischargeComponent } from './ipddischarge.component';
import { ConfirmationdischargeComponent } from '../components/confirmationdischarge/confirmationdischarge.component';
/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */




@NgModule({
  imports: [
    CommonModule,
    IpddischargeRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  providers:[],
  declarations: [IpddischargeComponent],
  entryComponents : []
})
export class IpddischargeModule { }
