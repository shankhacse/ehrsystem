import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl , FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { MatSelect, VERSION } from '@angular/material';



@Component({
  selector: 'app-masterentrydialog',
  templateUrl: './masterentrydialog.component.html',
  styleUrls: ['./masterentrydialog.component.css']
})
export class MasterentrydialogComponent implements OnInit {
  fieldsArry = [];
  msg:string;
  heading:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;
  tablename : string;
  dataFrom : string;
  formIntilizeGroup ;
  masterEntryForm:any = FormGroup;
  masterDataList_Group = [];

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isEnableProgress = false;
  

  constructor(private router:Router,public dialogRef: MatDialogRef<MasterentrydialogComponent> , private commonService:CommonService, @Inject(MAT_DIALOG_DATA) public data: any , private fb: FormBuilder ) { 

    this.fieldsArry = this.data.fielddatas;  
    this.tablename = this.data.tbl;  
    this.dataFrom = this.data.datafrom;
    this.heading = this.data.heading;
    this.formIntilizeGroup = this.data.initializeField

    this.masterEntryForm = new FormGroup(this.formIntilizeGroup);
    console.log(this.fieldsArry);
  }


  ngOnInit() {
    this.isEnableProgress = false;
    if(this.tablename == "symptoms") {
      this.getMasterData("group",this.masterDataList_Group);
    }

  }


  closeDialog(): void {
    let data = {"from":"Close"}
    this.dialogRef.close(data);
  }


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


  getMasterData(tblname,storeData){
   // this.masterDataList = [];
    let dataval;
    let datalist;
    this.commonService.getMasterInfo(tblname).then(data => {
      dataval = data;
      datalist = dataval.result;
      storeData.push(datalist);
    },
    error => {
     console.log("There is some error in hospital List...");
   });
  }




}
