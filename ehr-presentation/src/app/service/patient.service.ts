import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalconstantService } from './globalconstant.service';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


export class PatientsCls {
  public patient_name: string;
  public patient_code: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public http: HttpClient,private global:GlobalconstantService) {

   }
   GetPatientListAll(){
    return this.http.get(this.global.ListPatient);
    }


    getPatientList(){
  
    
       return new Promise(resolve => {
          this.http.get(this.global.ListPatient).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
    }

    getPatientLists(hospitalid){
      let myData = JSON.stringify({hospital_id: hospitalid});
       return new Promise(resolve => {
          this.http.post(this.global.ListPatient,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
      
    }

    getPatientDetailById(patientid){
      let hospitalid = 1; // will come from global file // need to change
      let myData = JSON.stringify({hospital_id: hospitalid,patient_id:patientid});
       return new Promise(resolve => {
          this.http.post(this.global.patientdetail_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
      
    }

    getPatientByCode(pcode){
      let myData = JSON.stringify({pcode: pcode});
       return new Promise(resolve => {
          this.http.post(this.global.patientPrescInfoBycode_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
      
    }

    getPatientLastPrescByCode(pcode,presfrom){
      let myData = JSON.stringify({pcode: pcode , presfrom:presfrom});
       return new Promise(resolve => {
          this.http.post(this.global.patientPrescInfoBycode_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
      
    }

    getPatientLastPrescByPatientID(pcode,presfrom){
      let myData = JSON.stringify({pcode: pcode , presfrom:presfrom});
       return new Promise(resolve => {
          this.http.post(this.global.patientPrescInfoByPatientID_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
      
    }

    getLastPregnencyData(pid) {
      let myData = JSON.stringify({pid: pid});
      return new Promise(resolve => {
         this.http.post(this.global.patientLastPregnenctInfoBycode_URL,myData).subscribe(data => {
           resolve(data);
          
         }, err => {
           console.log(err);
         });
       });
    }



    registerPatient(formValue){
      let hospitalid = 1; // will come from global file // need to change
      let myData = JSON.stringify({hospital_id: hospitalid,values:formValue});
       return new Promise(resolve => {
          this.http.post(this.global.registerPatient_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
    }

    addNewPatient(formValue,dob){
    
      let myData = JSON.stringify({values:formValue,dob:dob});
       return new Promise(resolve => {
          this.http.post(this.global.addnewPatient_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
    }

    searchPatient(formValue,serachtype){
      let hospitalid = 1; // will come from global file // need to change
      let myData = JSON.stringify({hospital_id: hospitalid,values:formValue,stype:serachtype});
       return new Promise(resolve => {
          this.http.post(this.global.searchPatient_URL,myData).subscribe(data => {
            resolve(data);
          }, err => {
            console.log(err);
          });
        });
    }


    checkIsRegisteredToday(formValue,serachtype){
      let myData = JSON.stringify({values:formValue,stype:serachtype});
      return new Promise(resolve => {
         this.http.post(this.global.isregisterdToday_URL,myData).subscribe(data => {
           resolve(data);
          
         }, err => {
           console.log(err);
         });
       });
    }


    getPatientInfoByCode(pcode){
      let myData = JSON.stringify({pcode: pcode});
       return new Promise(resolve => {
          this.http.post(this.global.patientInfoBycode_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
      
    }


    getPatientInfoByPatientID(pcode){
      let myData = JSON.stringify({pcode: pcode});
       return new Promise(resolve => {
          this.http.post(this.global.patientInfoByPatientID_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
      
    }

    filterPatientByCode(pcode){
      let myData = JSON.stringify({pcode: pcode});
       return new Promise(resolve => {
          this.http.post(this.global.patientSearchByQry_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
    }

    associatedEmplByCode(pcode){
      let myData = JSON.stringify({pcode: pcode});
       return new Promise(resolve => {
          this.http.post(this.global.associatedEmpSearchBycode_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
    }

   

    filterPatientAadharNo(aadhar){
      let myData = JSON.stringify({aadhar: aadhar});
       return new Promise(resolve => {
          this.http.post(this.global.patientSearchByaadhar_URL,myData).subscribe(data => {
            resolve(data);
           
          }, err => {
            console.log(err);
          });
        });
    }


    getPatientForIPD(empcode,relation) {
      let myData = JSON.stringify({empcode: empcode , rel: relation});
      return new Promise(resolve => {
         this.http.post(this.global.ipdpatientByEmpRel_URL,myData).subscribe(data => {
           resolve(data);
          
         }, err => {
           console.log(err);
         });
       });
    }


    /**
     * Vaccination Services
     * 
     * 
     */

    getVaccinationListBySchedule(schedule,pid) {
      let myData = JSON.stringify({schedule: schedule,pid});
       return new Promise(resolve => {
          this.http.post(this.global.vaccinListByschedule_URL,myData).subscribe(data => {
            resolve(data);
          }, err => {
            console.log(err);
          });
        });
    }

  
    insertIntoVaccine(patientHealthInfo,patientInfo,vaccineGivenData,additionalData) {
      let datas = JSON.stringify({patientHealthInfo:patientHealthInfo,patientinfo:patientInfo,vaccineGivenData:vaccineGivenData,additionalData:additionalData});
      return new Promise(resolve => {
        this.http.post(this.global.insertVaccination_URL,datas).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
     });
    }


    insertIntoPregnancy(objParam) {
      let datas = JSON.stringify({objParam});
      return new Promise(resolve => {
        this.http.post(this.global.insertIntoPregnancy_URL,datas).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
     });
    }




    getOpdPatientPrescHistory(patientID){
      let myData = JSON.stringify({pid:patientID});
       return new Promise(resolve => {
          this.http.post(this.global.opdPatientPrescHistory_URL,myData).subscribe(data => {
            resolve(data);
          }, err => {
            console.log(err);
          });
        });
    }
   
}
