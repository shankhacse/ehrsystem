import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalconstantService } from './globalconstant.service';

@Injectable({
  providedIn: 'root'
})
export class PhramcyService {

  constructor(private http: HttpClient,private global:GlobalconstantService) { }

  getPrescriptionsListForPharmcy(date){
   
    let myData = JSON.stringify({searchdt:date});
     return new Promise(resolve => {
        this.http.post(this.global.todaysPrescriptionPharmcy_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

  getIPDPrescriptionsListForPharmcy(date) {
   
    let myData = JSON.stringify({searchdt:date});
     return new Promise(resolve => {
        this.http.post(this.global.todaysIPDPrescriptionPharmcy_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

  getMedicinesByPrescription(prescriptionID,from){
     
    let myData = JSON.stringify({prescID:prescriptionID,from:from});
     return new Promise(resolve => {
        this.http.post(this.global.medicineByprescriptionID_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

  insertToMedicineIssue(patientinfo,medicineinfo,from,hprofile,prescuid) {
    let datas = JSON.stringify({patientinfo:patientinfo,medicineinfo:medicineinfo,from:from,hprofile:hprofile,prescuid:prescuid});
    return new Promise(resolve => {
      this.http.post(this.global.insertMedicineIssue_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }

  getMedicineBatchInfo(medid,reqqty) {
    let datas = JSON.stringify({medid:medid,issue:reqqty});
    return new Promise(resolve => {
      this.http.post(this.global.medicineBatchInfo_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
     });
  }


}
