import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { SuperadminComponent } from './superadmin.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';






@NgModule({
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers:[],
  declarations: [SuperadminComponent] ,
  entryComponents : []
})
export class SuperadminModule { }
