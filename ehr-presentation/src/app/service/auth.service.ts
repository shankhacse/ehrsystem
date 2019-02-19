import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalconstantService } from './globalconstant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient,private global:GlobalconstantService) { }

  signInVerification(formData){

    let loginData = JSON.stringify({formData});
    return new Promise(resolve => {
       this.http.post(this.global.signin,formData).subscribe(data => {
         resolve(data);
        
       }, err => {
         console.log(err);
       });
     });
  }

}
