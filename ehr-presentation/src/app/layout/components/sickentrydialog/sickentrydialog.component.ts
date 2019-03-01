import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { SymptomdiseaseService } from '../../../service/symptomdisease.service';
import { Validators, FormBuilder, FormGroup, FormControl , FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { MatSelect, VERSION } from '@angular/material';

@Component({
  selector: 'app-sickentrydialog',
  templateUrl: './sickentrydialog.component.html',
  styleUrls: ['./sickentrydialog.component.css']
})
export class SickentrydialogComponent implements OnInit {

  fieldsArry = [];
  msg:string;
  heading:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;
  tablename : string;
  dataFrom : string;
  formIntilizeGroup ;
  sickDialogEntryForm:any = FormGroup;
  masterDataList_Group = [];
  refferHospitals = [];
  sickValidationError:boolean = false;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isEnableProgress = false;
  disableClick;
  

  constructor(private router:Router,public dialogRef: MatDialogRef<SickentrydialogComponent> , private commonService:CommonService, @Inject(MAT_DIALOG_DATA) public data: any , private symptomdiseaseService:SymptomdiseaseService ) { 

    this.isEnableProgress = false;

    this.sickDialogEntryForm = new FormGroup({
      hdnRegID : new FormControl(this.data.registration_id,Validators.required),
      hdnPatientID : new FormControl(this.data.patient_id,Validators.required),
      hdnRegtype : new FormControl(this.data.reg_type,Validators.required),
      sickdaysCtrl : new FormControl(1,Validators.required),
      approvalCtrl : new FormControl(),
      admitCtrl : new FormControl(),
      observCtrl : new FormControl(),
      isReffHospital : new FormControl(),
      reffHospitalCtrl: new FormControl({value: '', disabled: true}),
    });
   
  }


  ngOnInit() {

    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable Sick Leave Approval: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }
    this.isEnableProgress = false;
    this.getHospitals();

  }

  getHospitals(){
    let dataval;
    let hospitallist;
    this.commonService.getHospitals().then(data => {
      dataval = data;
      hospitallist = dataval.result;
      this.refferHospitals.push(hospitallist);
    },
    error => {
     console.log("There is some error in hospital List...");
   });
  }


  closeDialog(): void {
    let data = {"from":"Close"}
    this.dialogRef.close(data);
  }


  /*
  saveMasterEntryData(){
    this.isEnableProgress = true;
    let response;
    let otherinfo = {tname:this.tablename,datafrm:this.dataFrom}
    let params = {
      formsVal : this.masterEntryForm.value,
      otherInfo : otherinfo
    }
  

    this.commonService.saveMasterDataByDialog(params).then(data => {
      response = data;
     if(response.msg_status == 200) {
      this.isEnableProgress = false;
      let data = {"from":"Save"}
      this.dialogRef.close(data);
    
     }
     else{
        this.isEnableProgress = false;
       console.log();
     }
             
    },
    error => {
     console.log("There is some error in master data entry dialog...");
   });


  }
*/


  saveSickLeave() {
    this.sickValidationError = false;
    this.isEnableProgress = true;
    let response;
    
    if(this.sickDialogEntryForm.get('sickdaysCtrl').value > 0) {
     
     
    
        this.symptomdiseaseService.insertToSickLeave(this.sickDialogEntryForm.value).then(data => {
          response = data;
        if(response.msg_status == 200) {
          this.isEnableProgress = false;
          let data = {"from":"Save"}
          this.dialogRef.close(data);
        
        }
        else{
            this.isEnableProgress = false;
          console.log();
        }
                
        },
        error => {
        console.log("There is some error in master data entry dialog...");
      }); 
    
    }
    else{
      this.isEnableProgress = false;
      this.sickValidationError = true;
    }
  

  }

   
  validateRecomChkBox(event,tag){
    if(tag == "ADMIT"){
      this.sickDialogEntryForm.patchValue({
        observCtrl: false
       });
    }
    if(tag == "OBSERVATION"){
      this.sickDialogEntryForm.patchValue({
        admitCtrl: false
       });
    }
  }

  enableReffHospital(event){
    if(event.checked){
    
      this.sickDialogEntryForm.controls['reffHospitalCtrl'].enable(); 
    }
    else{
      this.sickDialogEntryForm.patchValue({
        reffHospitalCtrl: ''
      });
      this.sickDialogEntryForm.controls['reffHospitalCtrl'].disable(); 
    }
  }

}
