import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { ImportgrnRoutingModule } from './importgrn-routing.module';
import { ImportgrnComponent } from './importgrn.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { ImportgrnvalidationdialogComponent } from '../components/importgrnvalidationdialog/importgrnvalidationdialog.component';








/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    ImportgrnRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule, 
 
    
    
  ],
  providers:[],
  declarations: [ImportgrnComponent,ImportgrnvalidationdialogComponent],
  entryComponents : [ImportgrnComponent,ImportgrnvalidationdialogComponent]
})
export class ImportgrnModule { }
