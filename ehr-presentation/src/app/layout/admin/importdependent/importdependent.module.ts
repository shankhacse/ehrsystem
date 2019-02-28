import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { ImportdependentdialogComponent } from '../components/importdependentdialog/importdependentdialog.component';
import { ImportdependentComponent } from './importdependent.component';
import { ImportdependentRoutingModule } from './importdependent-routing.module';



@NgModule({
  imports: [
    CommonModule,
    ImportdependentRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule, 
 
    
    
  ],
  providers:[],
  declarations: [ImportdependentComponent,ImportdependentdialogComponent],
  entryComponents : [ImportdependentComponent,ImportdependentdialogComponent]
})
export class ImportdependentModule { }
