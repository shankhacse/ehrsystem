import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';



/*import { SuccessdialogComponent } from '../components/successdialog/successdialog.component';*/
import { IpdvisitRoutingModule } from './ipdvisit-routing.module';
import { IpdvisitComponent } from './ipdvisit.component';
import { IpdvisithistordialogComponent } from '../components/ipdvisithistordialog/ipdvisithistordialog.component';









@NgModule({
  imports: [
    CommonModule,
    IpdvisitRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  providers:[],
  declarations: [IpdvisitComponent,IpdvisithistordialogComponent],
  entryComponents : [IpdvisithistordialogComponent]
})
export class IpdvisitModule { }
