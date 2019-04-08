import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { SymptomdiseaseService } from '../../../service/symptomdisease.service';
import { Validators, FormBuilder, FormGroup, FormControl , FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { MatSelect, VERSION } from '@angular/material';

@Component({
  selector: 'app-approvedsickleavedetailsdialog',
  templateUrl: './approvedsickleavedetailsdialog.component.html',
  styleUrls: ['./approvedsickleavedetailsdialog.component.css']
})
export class ApprovedsickleavedetailsdialogComponent implements OnInit {

  approvedList = []; 
  redirectUrl:string;
  recordsFound=false;

  searchdate:string;
  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<ApprovedsickleavedetailsdialogComponent> ,
    private commonService:CommonService,

    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    console.log('Dialog'+data.approved_on);
    this.searchdate=data.approved_on;
    this.getApprovedDetailsData(this.searchdate);
    }

  ngOnInit() {
    this.getApprovedDetailsData(this.searchdate);
  }



  redirectToComp(){
   // console.log(this.redirectUrl);
    this.dialogRef.close();
    this.router.navigateByUrl('panel/sickapproval');
  }

  getApprovedDetailsData(date){
    console.log('getApprovedDetailsData'+date);


    this.approvedList=[];
    this.recordsFound  = false;
    let dataval;
    let appsickLeaveData;
    this.commonService.getSickApprovedDetailsbydate(date).then(data=>{
      dataval =data;
      appsickLeaveData = dataval.resultdata;
      this.approvedList.push(appsickLeaveData);
      const tcount = this.approvedList[0].length;
     //  this.exceldata=this.sickLeaveList[0];
       if(tcount>0){
         this.recordsFound = true;
        
      }
    //  this.dataSource = new MatTableDataSource(this.approvedList[0]);
    console.log(this.approvedList[0]);
    },
    error=>{
        console.log("Error in listing sick leave");
    });
  }
   

}
