import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { ImportexcelRoutingModule } from './importexcel-routing.module';
import { ImportexcelComponent } from './importexcel.component';

import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';

import { ExcelvalidationdialogComponent } from '../components/excelvalidationdialog/excelvalidationdialog.component';








/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    ImportexcelRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule 
    
    
  ],
  providers:[],
  declarations: [ImportexcelComponent,ExcelvalidationdialogComponent],
  entryComponents : [ImportexcelComponent,ExcelvalidationdialogComponent]
})
export class ImportexcelModule { }
