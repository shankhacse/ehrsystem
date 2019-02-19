import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { OpdpreprationRoutingModule } from './opdprepration-routing.module';
import { OpdpreprationComponent } from './opdprepration.component';
import { ChildvaccinationComponent } from '../partialcomponent/childvaccination/childvaccination.component';
import { PregnancyComponent } from '../partialcomponent/pregnancy/pregnancy.component';
import { OpdprescriptionhistordialogComponent } from '../components/opdprescriptionhistordialog/opdprescriptionhistordialog.component';
import { OpdnewprescconfirmationdialogComponent } from '../components/opdnewprescconfirmationdialog/opdnewprescconfirmationdialog.component';







/* import { SuccessdialogComponent } from '../components/successdialog/successdialog.component'; */

@NgModule({
  imports: [
    CommonModule,
    OpdpreprationRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule 
    
    
  ],
  providers:[],
  declarations: [OpdpreprationComponent,ChildvaccinationComponent,PregnancyComponent,OpdprescriptionhistordialogComponent,OpdnewprescconfirmationdialogComponent],
  entryComponents : [OpdprescriptionhistordialogComponent,OpdnewprescconfirmationdialogComponent]
})
export class OpdpreprationModule { }
