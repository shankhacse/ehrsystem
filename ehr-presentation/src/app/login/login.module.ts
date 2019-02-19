import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';


@NgModule({
    imports: 
    [CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
