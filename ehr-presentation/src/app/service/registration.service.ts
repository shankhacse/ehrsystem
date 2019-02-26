import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalconstantService } from './globalconstant.service';
import { Observable }     from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(public http: HttpClient,private global:GlobalconstantService) { }

  getTodaysRegistration(){
    return new Promise(resolve => {
        this.http.get(this.global.todaysReg_URL).subscribe(data => {
          resolve(data);
         
        }, err => {
          console.log(err);
        });
      });
    
  }

  registerPatient(formdata){
    let myData = JSON.stringify({values:formdata});
     return new Promise(resolve => {
        this.http.post(this.global.registerPatient_URL,myData).subscribe(data => {
          resolve(data);
         
        }, err => {
          console.log(err);
        });
      });
  }

  getTodaysRegForDoc(type,serve){
    let myData = JSON.stringify({type:type,serve:serve});
    return new Promise(resolve => {
        this.http.post(this.global.todaysRegDoct_URL,myData).subscribe(data => {
          resolve(data);
         
        }, err => {
          console.log(err);
        });
      });
    
  }

  sickApprove(rowid,status){
   
    let myData = JSON.stringify({rowid:rowid,sick_leave_apprv:status});
     return new Promise(resolve => {
        this.http.post(this.global.sickApprovalUpdate_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }




  getTodaysRegByRegType(type,serve,serachDate) {
    let myData = JSON.stringify({type:type,serve:serve,serachDate:serachDate});
    return new Promise(resolve => {
        this.http.post(this.global.todaysRegByRegType_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

  /*---------------------------------- 25 February 2019 ------------------------------------ */
  /**
 * @author Shankha Ghosh
 * @param formval 
 * @description get Patient Registration list by date range
 */


getPatientRegistrationByDate(formdata,fromdate,todate){
  let datas = JSON.stringify({data:formdata,fromdate:fromdate,todate:todate});
  return new Promise(resolve => {
    this.http.post(this.global.RegListBydate_URL,datas).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
 });
}


  /*---------------------------------- 25 February 2019 ------------------------------------ */
  /**
 * @author Shankha Ghosh
 * @param formval 
 * @description get Patient Registration list by date
 */



getRegistrationByDate(formdata){
  let datas = JSON.stringify({data:formdata});
  return new Promise(resolve => {
      this.http.post(this.global.regBydate_URL,datas).subscribe(data => {
        resolve(data);
       
      }, err => {
        console.log(err);
      });
    });
  
}

  
}
