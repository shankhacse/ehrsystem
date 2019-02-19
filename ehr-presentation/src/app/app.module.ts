import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';

import { FormsModule ,ReactiveFormsModule } from '@angular/forms';




import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokeninterceptorService } from './service/tokeninterceptor.service';
import { GlobalconstantService } from './service/globalconstant.service';
import { AuthService } from './service/auth.service';



import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatListModule ,MatMenuModule } from '@angular/material';
import { AppMaterialModule } from './app-material/app-material.module';
import { AutofocusDirective } from './autofocus.directive';






@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    
   
     
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [GlobalconstantService,AuthService,ErrorHandler,
      {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeninterceptorService,
      multi: true
      }
      
  ],
 
 
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(router: Router) {}

}
