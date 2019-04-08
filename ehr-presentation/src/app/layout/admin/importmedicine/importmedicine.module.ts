import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { ImportmedicineComponent } from './importmedicine.component';
import { ImportmedicineRoutingModule } from './importmedicine-routing.module';
import { ImportmedicinedialogComponent } from '../components/importmedicinedialog/importmedicinedialog.component';





@NgModule({
  imports: [
    CommonModule,
    ImportmedicineRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule, 
 
    
    
  ],
  providers:[],
  declarations: [ImportmedicineComponent,ImportmedicinedialogComponent],
  entryComponents : [ImportmedicineComponent,ImportmedicinedialogComponent]
})
export class ImportmedicineModule { }
