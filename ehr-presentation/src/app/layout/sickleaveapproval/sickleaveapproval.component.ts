import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { CommonService } from '../../service/common.service';
import { RegistrationService } from '../../service/registration.service';

import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';



@Component({
  selector: 'app-sickleaveapproval',
  templateUrl: './sickleaveapproval.component.html',
  styleUrls: ['./sickleaveapproval.component.css']
})
export class SickleaveapprovalComponent implements OnInit {
  displayedColumns: string[] = [ 'action',
  'patient_code',
  'patient_name',
  'gender', 
  'division_number' ,
  'challan_number' ,
  'line_number' ,
  'mobile_one',
  ];
  sickLeaveList=[];
  recordsFound=false;
  isButtonActive=true;

  sickLeaveApprovalCount =0;
  totalTodaysRegCount=0;

  dataSource ;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private commonservice:CommonService,private registrationService:RegistrationService,private router:Router) {

   }
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  date = new FormControl(new Date());
  ngOnInit() {
   
    this.getSickApproveList();

    this.getSickLeaveApproveCount();
    //this.dataSource.paginator = this.paginator;
    
  }




  
  getSickApproveList(){
    //sickleaveList
    this.sickLeaveList=[];
    this.recordsFound  = false;
    let dataval;
    let sickLeaveData;
    this.commonservice.getSickApproveList().then(data=>{
      dataval =data;
      sickLeaveData = dataval.sickleaveList;
      this.sickLeaveList.push(sickLeaveData);
      const tcount = this.sickLeaveList[0].length;
      if(tcount>0){
        this.recordsFound = true;
      }
      this.dataSource = new MatTableDataSource(this.sickLeaveList[0]);
    },
    error=>{
        console.log("Error in listing sick leave");
    });
  }
 
  getSickLeaveApproveCount()
  {
    let sickLeaveListCount =[];
    this.totalTodaysRegCount =0;
    this.sickLeaveApprovalCount =0;
    let dataval;
    let countData;

    this.commonservice.getSickLeaveApproveCount().then(data=>{
      dataval = data;
      countData = dataval.result;
      //console.log(countData);
      this.totalTodaysRegCount=countData.totalRegister;
      this.sickLeaveApprovalCount = countData.totalApproved;
    },error=>{
      console.log("Error in listing sick leave count");
    });

  }

 sickApprove(rowid,status)
  {
    let sickLeaveApprovalStatus;
    let response;
    if(status=='Y'){
      sickLeaveApprovalStatus='N'
    }else{
      sickLeaveApprovalStatus='Y'
    }
    this.registrationService.sickApprove(rowid,sickLeaveApprovalStatus).then(
      data=>{
        response=data;
              if(response.result==1){
                this.getSickApproveList();
                this.getSickLeaveApproveCount();
              }
      },
      error=>{
        console.log("Error in sick approve update");
      }
      
      
    );

  }
  

  backToList(){
    this.router.navigateByUrl('panel/todaysreg');
  }
}

  



