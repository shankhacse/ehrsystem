import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { LinelistComponent } from './linelist.component';
import { LinelistRoutingModule } from './linelist-routing.module';
import { LinedialogComponent } from '../../components/linedialog/linedialog.component';








@NgModule({
  imports: [
    CommonModule,
    LinelistRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [LinelistComponent,LinedialogComponent],
  entryComponents : [LinelistComponent,LinedialogComponent]
})
export class LinelistModule { }
