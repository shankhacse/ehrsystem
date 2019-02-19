import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { IpdService } from '../../../service/ipd.service';






@Component({
  selector: 'app-ipdvisithistordialog',
  templateUrl: './ipdvisithistordialog.component.html',
  styleUrls: ['./ipdvisithistordialog.component.css']
})
export class IpdvisithistordialogComponent implements OnInit {
  panelOpenState = false;
  medicineDisplayedColumns: string[] = ['medicine_name', 'value', 'frequeny', 'number_of_days_sick_leave'];
  medicineDataSource:any = [];

  patientobj:any;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;

  color = 'primary';
  mode = 'determinate';
  value = 50;

  isContentLoaded = false;
  isRecordFoundFound = true;


  visitHistoryList = [];
  medicineRowsData = [];

  constructor(private router:Router,public dialogRef: MatDialogRef<IpdvisithistordialogComponent> , private commonService:CommonService,private patientService:PatientService, @Inject(MAT_DIALOG_DATA) public data: any , private ipdService:IpdService) {

    this.patientobj = this.data.patientobj;  
    this.msgIcon = this.data.msgicon;
    this.iconColor = this.data.iconcolor;
    this.redirectUrl = this.data.btnurl;

   }

  ngOnInit() {
    let patientID = localStorage.getItem("ipdpatientID");
    let ipdAdmsID = localStorage.getItem("ipdadmissionID");
  
    /**
     * Setting Value to Field 
     */


    let response;
    let pdata;
    
    this.ipdService.getIpdPatientVisitHistory(patientID,ipdAdmsID).then(data => {
      this.isRecordFoundFound = false;
      response = data;
      if(response.msg_status==200) {
        this.isContentLoaded = true;
        pdata = response.result ; 
        this.visitHistoryList.push(pdata);
        if(this.visitHistoryList[0].length > 0){
          this.isRecordFoundFound = true;
        }
        else{
          this.isRecordFoundFound = false;
        }
        
    }
    else{
      this.isContentLoaded = false;
      }
     },

     error => {
         console.log("There is some error on submitting...");
     });



  }

  step = 0;
  /*
  getIpdHistoryByDate(index: number) {
    this.step = index;
  }
  */
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  closeDialog(): void {
    let data = {
      "from":"Close"
    }
    this.dialogRef.close();
  }

  getIpdHistoryByDate(data,ipdhistory){
    this.step = data;
    console.log(data);
    console.log(ipdhistory);
  }

}
