import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalconstantService } from './globalconstant.service';

@Injectable({
  providedIn: 'root'
})
export class SymptomdiseaseService {

  constructor(public http: HttpClient,private global:GlobalconstantService) {}

  getInvestigations() {
    return new Promise(resolve => {
       this.http.get(this.global.investigationlist_URL).subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
    });
  }

  getSymptoms() {
    return new Promise(resolve => {
       this.http.get(this.global.symptomlist_URL).subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
    });
  }

  getDiseasesBySymptom(symptoms){
    let datas = JSON.stringify({symptom:symptoms});
    return new Promise(resolve => {
      this.http.post(this.global.diseaselist_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }

  getMedicineByDisease(medicine){
    let datas = JSON.stringify({medicine:medicine});
    return new Promise(resolve => {
      this.http.post(this.global.medicinelist_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }

  getMedicineListByName(medicine){
    let datas = JSON.stringify({medicine:medicine});
    return new Promise(resolve => {
      this.http.post(this.global.medicinelistByName_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }

  getAllMedicineList(){
   // let datas = JSON.stringify({medicine:medicine});
    return new Promise(resolve => {
      this.http.get(this.global.allMedicineList_URL).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }



  getDosageByMedicine(medicine){
    let datas = JSON.stringify({medicine:medicine});
    return new Promise(resolve => {
      this.http.post(this.global.dosageByMedlist_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }

  getFrequencyByMedicine(medicine){
    let datas = JSON.stringify({medicine:medicine});
    return new Promise(resolve => {
      this.http.post(this.global.frequencyByMedlist_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }


  insertToOPD(healthprofile,opdform,medicines,reports){
    let datas = JSON.stringify({healthprofile:healthprofile,opdform:opdform,medicines:medicines,reports:reports});
    return new Promise(resolve => {
      this.http.post(this.global.insertOPD_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }

  getIssuedMedicineListByDateAndMedicine(formdata){
    let datas = JSON.stringify({data:formdata});
    return new Promise(resolve => {
      this.http.post(this.global.issuedMedByDateAndMed_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }


  insertToSickLeave(formdata) {
    let datas = JSON.stringify({formdata:formdata});
    return new Promise(resolve => {
      this.http.post(this.global.insertSickLeave_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }



}
