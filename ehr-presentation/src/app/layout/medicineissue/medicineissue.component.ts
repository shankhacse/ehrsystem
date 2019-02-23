import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild , ViewEncapsulation  } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommonService } from './../../service/common.service';
import { SymptomdiseaseService } from './../../service/symptomdisease.service';
import { Validators, FormBuilder, FormGroup, FormControl , FormArray  } from '@angular/forms';
import { DatashareService } from './../../service/datashare.service';
import { PatientService } from './../../service/patient.service';

import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig} from '@angular/material';
import { SuccessdialogComponent } from '../components/successdialog/successdialog.component';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { PhramcyService } from '../../service/phramcy.service';







@Component({
  selector: 'app-medicineissue',
  templateUrl: './medicineissue.component.html',
  styleUrls: ['./medicineissue.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicineissueComponent implements OnInit {

  
  issueBtnDisable = false;
  patientData ;
  PatientID = null;
  patientCode = null;
  PatientName = null;
  PatientType = null;
  PatientAge = null;

  medicineError:string = "";
  testReportError:string = "";
  validFormErr:string = "";
  lastPresciptionID:number = 0;
  loclStrgHealthPrflID;
  

  displayedColumns: string[] = [ 'datetd' , 'medicinetd' , 'dosagetd' , 'unittd', 'daystd' , 'actiontd'];
  
  dataSource = [];

  displayedColumnsReport: string[] = [ 'datetd' , 'reportdtd', 'actiontd'];
  
  addedMeddata = [];
  addedInvestigations = [];

  prescriptObj;
  prescriptionMedPatientInfoForm : FormGroup;
  prescriptionMedForm : FormGroup;
  sendPhrmcyBtnActive = true;
  localStrgPcode = "";
  localStrgPrescpID;
  localStrgPrescpPCode;
  localStrgPrescpNo;
  medicineListsDatas = [];
  medicinesItems : FormArray;
  productionForm: FormGroup;

  invoiceForm: FormGroup;

  prescrptDoneFrom ;
  healthProfileID;


    constructor(
        private router:Router,
        private commonService:CommonService, 
        private datashareService:DatashareService ,
        private patientService:PatientService ,
        public  dialog: MatDialog,
        private phramcyService:PhramcyService , 
        private fb: FormBuilder,
        private symptomdiseaseService:SymptomdiseaseService
        ) 
        {
      
    this.prescriptObj = this.datashareService.getPrescriptionRowData();
        
      console.log("start");
      console.log(this.prescriptObj);
      console.log("end");

      // this.prescrptDoneFrom = this.prescriptObj.prescFrom;
      if(this.prescriptObj && this.prescriptObj.prescFrom == "O") {

        localStorage.setItem("prescid", this.prescriptObj.prescription_ID);
        localStorage.setItem("prescpcode", this.prescriptObj.patient_code);
        localStorage.setItem("prescpno", this.prescriptObj.prescription_No);
        localStorage.setItem("presfrom", this.prescriptObj.prescFrom);
        localStorage.setItem("med_p_health_id", this.prescriptObj.health_profile_uid);
        localStorage.setItem("med_patient_id", this.prescriptObj.patient_id);

        this.localStrgPrescpID = localStorage.getItem("prescid");
        this.localStrgPrescpPCode = localStorage.getItem("prescpcode");
        this.localStrgPrescpNo = localStorage.getItem("prescpno");
        this.prescrptDoneFrom = localStorage.getItem("presfrom");
        this.healthProfileID = localStorage.getItem("med_p_health_id");
       
    }

    if(this.prescriptObj && this.prescriptObj.prescFrom == "I") {
      localStorage.setItem("prescid", this.prescriptObj.prescription_ID);
      localStorage.setItem("prescpcode", this.prescriptObj.patient_code);
      localStorage.setItem("prescpno", this.prescriptObj.prescription_ID);
      localStorage.setItem("presfrom", this.prescriptObj.prescFrom);
      localStorage.setItem("med_p_health_id", this.prescriptObj.health_profile_uid);
      localStorage.setItem("med_patient_id", this.prescriptObj.patient_id);

      this.localStrgPrescpID = localStorage.getItem("prescid");
      this.localStrgPrescpPCode = localStorage.getItem("prescpcode");
      this.localStrgPrescpNo = localStorage.getItem("prescid"); // prescpno = prescid in IPD case
      this.prescrptDoneFrom = localStorage.getItem("presfrom");
      this.healthProfileID = localStorage.getItem("med_p_health_id");
    
    }
     
    this.prescriptionMedPatientInfoForm = new FormGroup({
        patientCode: new FormControl({value: '', disabled: true}),
        patientID: new FormControl({value: '', disabled: true}),
        patientType: new FormControl({value: '', disabled: true}),
        patientName: new FormControl({value: '', disabled: true}),
        patientAge: new FormControl({value: '', disabled: true}),
        ParmanentwrkCtrl: new FormControl({value: '', disabled: true}),
        prescriptionNo : new FormControl({value: '', disabled: true}) 
      });

    





   
   

    }






  
    ngOnInit() {
      
      this.prescriptionMedForm = this.fb.group({
        medicineRows: this.fb.array([])
      });
  

      if(localStorage.getItem('presfrom') == "I") {
        this.getIPDPatientInfo();
      }
      
      if(localStorage.getItem('presfrom') == "O") {
       this.getOPDPatientInfo();
      }

      
       

  }



  getOPDPatientInfo(){
    let response;
    let pdata;
    let symptomlist;
    let diagnosislist;
    let medicinedata;
    let reportdata;

    /* this.patientService.getPatientInfoByCode(localStorage.getItem("prescpcode")).then(data => { */
    this.patientService.getPatientInfoByPatientID(localStorage.getItem("med_patient_id")).then(data => {
      response = data;
      if(response.msg_status==200) {
        pdata = response.result ; 
        this.prescriptionMedPatientInfoForm.patchValue({
          patientID: pdata.patient_id,
          patientCode: pdata.patient_code,
          patientType:pdata.patient_type,
          patientName: pdata.patient_name,
          patientAge: response.age + " Yrs.",
          prescriptionNo :  localStorage.getItem("prescpno"),
          ParmanentwrkCtrl:pdata.patient_code
         
      });
      
      
    }
    else{
       
      }
     },

     error => {
         console.log("There is some error on submitting...");
     });

     this.getMedicinesByPrescription(localStorage.getItem("prescid"),localStorage.getItem("presfrom"));


  }

  getIPDPatientInfo() {
    let response;
    let pdata;
    let symptomlist;
    let diagnosislist;
    let medicinedata;
    let reportdata;

    /* this.patientService.getPatientInfoByCode(localStorage.getItem("prescpcode")).then(data => { */
     /* this.patientService.getPatientInfoByPatientID(localStorage.getItem("med_patient_id")).then(data => { */
     this.patientService.getPatientIPDInfoByUniqueID(localStorage.getItem("prescid")).then(data => { 

      response = data;
     
      if(response.msg_status==200) {
        pdata = response.result ; 
        let wrk_name_code=pdata.associate_permworker_name+'('+pdata.associate_permworker_code+')';
        console.log(pdata.patient_id);
        this.prescriptionMedPatientInfoForm.patchValue({
          patientID: pdata.patient_id,
         /* patientCode: pdata.patient_code,*/
          ParmanentwrkCtrl:wrk_name_code,
          patientType:pdata.patient_type,
          patientName: pdata.patient_name,
          patientAge: pdata.patient_age + " Yrs.",
          prescriptionNo :  localStorage.getItem("prescpno")
         
      });
      
      
    }
    else{
       
      }
     },

     error => {
         console.log("There is some error on submitting...");
     });

     this.getMedicinesByPrescription(localStorage.getItem("prescid"),localStorage.getItem("presfrom"));


   
  }







  initializeMedicine(medidval , stockval, issueval , info) {
      return this.fb.group({
        medicineHdnID : [medidval],
          stock : [stockval],
          issue : [issueval],
          batchinfo : [info]
      });
  }
    

    getMedicinesByPrescription(prescriptionID,prescrptDoneFrom){

      console.log("Presc ID "+prescriptionID);
      console.log("Presc From "+prescrptDoneFrom);



      let response;
      let meddata;
      this.phramcyService.getMedicinesByPrescription(prescriptionID,prescrptDoneFrom).then(data => {
        response = data;
        meddata = response.result;
        if(response.msg_status == 200) {
          this.medicineListsDatas.push(meddata);
          const count3 = Object.keys(meddata).length;
          const control = <FormArray>this.prescriptionMedForm.controls['medicineRows'];
          for(let i = 0 ; i < count3 ; i++ ) {
            control.push(this.initializeMedicine(this.medicineListsDatas[0][i].medicine_id,this.medicineListsDatas[0][i].totalstock,this.medicineListsDatas[0][i].expectedissueqty,this.medicineListsDatas[0][i].batchnos));
          }
        }
     
       },
      error => {
           console.log("There is some error on submitting...");
       });
    
    }
  
    getbatchInfo(data,event,index,stockval) {
      this.issueBtnDisable = false;
      //(document.querySelector('#batchinfo_'+index) as HTMLElement).innerHTML = "";
      let myRow = document.getElementById('batchinfo_'+index);
      (myRow as HTMLInputElement).value = "";
      let issuedqty = event.target.value;

      if(issuedqty > 0){

      if(this.validateMedIssue(stockval,issuedqty) ) {

      let response;
      this.phramcyService.getMedicineBatchInfo(data.medicine_id,event.target.value).then(data => {
        response = data;
          this.sendPhrmcyBtnActive = true;
        if(response.msg_status == 200) {
         
          //(document.querySelector('#batchinfo1_'+index) as HTMLElement).innerHTML = response.batchnos;
          let myRow = document.getElementById('batchinfo_'+index);
          (myRow as HTMLInputElement).value = response.batchnos;
        

        }
        else {
         
        }
       },
         error => {
           console.log("There is some error on submitting...");
       });
      }
      else{
        (document.querySelector('#batchinfo_'+index) as HTMLElement).innerHTML = "<span style='color:red'>Check Issue Qty.</span>";
      }
    }


    }

    validateMedIssue(stock,issue) {
      this.issueBtnDisable = false;
      if(parseInt(issue , 10) > parseInt(stock,10)) {
        this.issueBtnDisable = true;
        return false;
      }
      return true;
    }
  
    issueMedicine() {
      /*
      console.log("prescriptionMedPatientInfoForm");
      console.log(this.prescriptionMedPatientInfoForm.value);
      console.log("prescriptionMedForm");
      console.log(this.prescriptionMedForm.value);
      console.log("prescrptDoneFrom");
      console.log(this.prescrptDoneFrom);
      */
   
     

      this.sendPhrmcyBtnActive = false;
      let response;
      this.phramcyService.insertToMedicineIssue(this.prescriptionMedPatientInfoForm.value,this.prescriptionMedForm.value,localStorage.getItem("presfrom"),localStorage.getItem("med_p_health_id"),localStorage.getItem("prescid")).then(data => {
        response = data;
          this.sendPhrmcyBtnActive = true;
        if(response.msg_status == 200) {
          
          localStorage.removeItem("prescid");
          localStorage.removeItem("prescpcode");
          localStorage.removeItem("prescpno");
          localStorage.removeItem("presfrom");
          localStorage.removeItem("med_p_health_id");
          localStorage.removeItem("med_patient_id");
          this.openDialog();  

        }
        else {
          this.openDialogError();
        }
       },
         error => {
           console.log("There is some error on submitting...");
       });
  
 


     }


    openDialog() {
      const dialogRef = this.dialog.open(SuccessdialogComponent, {
        width: '350px',
        disableClose: true,
        data:  {
          msg : 'Medicine Issued Successfully',
          msgicon : 'check_circle',
          iconcolor: '#1d8c3d',
          btnurl : 'panel/prescriptionlist'
          }
      });
    
      dialogRef.afterClosed().subscribe(result => {
      
      });
    }

    openDialogError() {
      const dialogRef = this.dialog.open(SuccessdialogComponent, {
        width: '350px',
        disableClose: true,
        data:  {
          msg : 'There is some Problem.Try again...',
          msgicon : 'check_circle',
          iconcolor: '#1d8c3d',
          btnurl : 'panel/medicineissue'
          }
      });
    
      dialogRef.afterClosed().subscribe(result => {
      
      });
    }

    backToIpdList() {
      this.router.navigateByUrl('panel/prescriptionlist');
    }


}
