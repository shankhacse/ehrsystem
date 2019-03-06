import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalconstantService } from './globalconstant.service';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class IpdService {

  constructor(public http: HttpClient,private global:GlobalconstantService) { }


  insertIntoIPD(formval,medicines,reports) {
    let datas = JSON.stringify({fdata:formval,medicines:medicines,reports:reports});
    return new Promise(resolve => {
      this.http.post(this.global.insertIPD_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }



  getIPDPrescriptionsList(date){
    let myData = JSON.stringify({searchdt:date});
     return new Promise(resolve => {
        this.http.post(this.global.todasyIPDList_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

  /* added on 05.03.2019 */

  getIPDPrescriptionsListByDateRange(formdata){
    let datas = JSON.stringify({data:formdata});
    
     return new Promise(resolve => {
        this.http.post(this.global.todasyIPDListDtRange_URL,datas).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

  getDischargeIPDPrescriptions(date){
    let myData = JSON.stringify({searchdt:date});
     return new Promise(resolve => {
        this.http.post(this.global.ipdDischargeList_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }
/* added on 05.03.2019 */
  getDischargeIPDPrescriptionsByDateRange(formdata){
    let datas = JSON.stringify({data:formdata});
     return new Promise(resolve => {
        this.http.post(this.global.ipdDischargeListDtRange_URL,datas).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

  ipdDetailInfoById(rowid){
    let myData = JSON.stringify({ipdid:rowid});
     return new Promise(resolve => {
        this.http.post(this.global.ipdDetailInfoByID_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }


  saveRegularVisitIPD(formval,medicines,reports) {
    let datas = JSON.stringify({fdata:formval,medicines:medicines,reports:reports});
    return new Promise(resolve => {
      this.http.post(this.global.insertregularVisitIPD_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }

  saveDischargeIPD(formval,medicines) {
    let datas = JSON.stringify({fdata:formval,medicines:medicines});
    return new Promise(resolve => {
      this.http.post(this.global.ipddischargeSave_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }


  removeDischarge(id) {
    let datas = JSON.stringify({id:id});
    return new Promise(resolve => {
      this.http.post(this.global.removeDischarge_URL,datas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
   });
  }


  getIpdPatientVisitHistory(patientID,ipdAdmsID){
    let myData = JSON.stringify({pid:patientID,admid:ipdAdmsID});
     return new Promise(resolve => {
        this.http.post(this.global.ipdPatientVisitHistory_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }


  /**
   * Used For Both IPD & OPD Print Presc.
   * params = opdipdmasterid,healthprofileid,opdipdType
   */

  getPrintDataForPresc(params){
    let myData = JSON.stringify({params:params});
     return new Promise(resolve => {
        this.http.post(this.global.opdipdPrescPrint_URL,myData).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }


}
