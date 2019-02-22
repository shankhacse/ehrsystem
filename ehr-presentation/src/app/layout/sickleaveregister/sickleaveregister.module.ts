import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { SickleaveregisterRoutingModule } from './sickleaveregister-routing.module';
import { SickleaveregisterComponent } from './sickleaveregister.component';









@NgModule({
  imports: [
    CommonModule,
    SickleaveregisterRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
 
  declarations: [SickleaveregisterComponent]
})
export class SickleaveregisterModule { }
