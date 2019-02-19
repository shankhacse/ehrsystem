import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { ReportsuploadRoutingModule } from './reportsupload-routing.module';
import { ReportsuploadComponent } from './reportsupload.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';








/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    ReportsuploadRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule, 
    
    
  ],
  providers:[],
  declarations: [ReportsuploadComponent,],
  entryComponents : [ReportsuploadComponent,]
})
export class ReportsuploadModule { }
