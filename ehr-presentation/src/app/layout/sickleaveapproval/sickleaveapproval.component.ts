import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { CommonService } from '../../service/common.service';
import { RegistrationService } from '../../service/registration.service';

import { Router } from '@angular/router';
import {FormControl,FormGroup} from '@angular/forms';
import { ExcelService } from '../../service/excel.service';

import { SickentrydialogComponent } from '../components/sickentrydialog/sickentrydialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ApprovedsickleavedetailsdialogComponent } from '../components/approvedsickleavedetailsdialog/approvedsickleavedetailsdialog.component';



@Component({
  selector: 'app-sickleaveapproval',
  templateUrl: './sickleaveapproval.component.html',
  styleUrls: ['./sickleaveapproval.component.css']
})
export class SickleaveapprovalComponent implements OnInit {
  displayedColumns: string[] = [ 'action',
  'apply_date',
  'approved_on',
  'patient_code',
  'patient_name',
  'gender', 
  'division_number' ,
  'challan_number' ,
  'line_number' ,
  'mobile_one',
  ];

  displayedApprovedColumns: string[] = [ 
  'approved_on',
  'approvedcount',
  'action',

  ];
  sickLeaveList=[];
  approvedsickLeaveList=[];
  exceldata=[];
  approvedexceldata=[];
  recordsFound=false;
  recordsFound2=false;
  isButtonActive=true;

  countbuttons=true;

  sickLeaveApprovalCount =0;
  totalTodaysRegCount=0;

  dataSource ;
  dataSource2 ;
  disableClick;
  SearchForm : FormGroup;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private commonservice:CommonService,private registrationService:RegistrationService,private router:Router,private excelService:ExcelService,public dialog: MatDialog, public snackBar: MatSnackBar) {

    this.SearchForm = new FormGroup({
      searchFromDateCtrl : new FormControl(new Date().toISOString()),
      searchToDateCtrl : new FormControl(new Date().toISOString()),
      searchTypeCtrl : new FormControl('DETAILS')
    });

   }
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  date = new FormControl(new Date());
  ngOnInit() {

    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable sickleaveapproval: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }
   
   // this.getSickApproveList();
    this.getSickApproveListByDateRange(this.SearchForm.value);

   // this.getSickLeaveApproveCount();
   this.getSickLeaveApproveCountByDateRange(this.SearchForm.value);
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
      this.exceldata=this.sickLeaveList[0];
      if(tcount>0){
        this.recordsFound = true;
        
      }
      this.dataSource = new MatTableDataSource(this.sickLeaveList[0]);
    },
    error=>{
        console.log("Error in listing sick leave");
    });
  }

  /*----------------------- Sick Approve List by date range ----------- */
  getSickApproveListByDateRange(formdata){
    //sickleaveList
    this.sickLeaveList=[];
    this.recordsFound  = false;
    let dataval;
    let sickLeaveData;
    this.commonservice.getSickApproveListByDateRange(formdata).then(data=>{
      dataval =data;
      sickLeaveData = dataval.sickleaveList;
      this.sickLeaveList.push(sickLeaveData);
      const tcount = this.sickLeaveList[0].length;
     //  this.exceldata=this.sickLeaveList[0];
      if(tcount>0){
        this.recordsFound = true;
              for(let i = 0; i<tcount; i++){

                this.exceldata[i]={
                  'apply_date': this.sickLeaveList[0][i].apply_date,
                  'approved_on': this.sickLeaveList[0][i].approved_on,
                  'patient_code': this.sickLeaveList[0][i].patient_code,
                  'patient_name': this.sickLeaveList[0][i].patient_name,
                  'gender': this.sickLeaveList[0][i].gender,
                  'division_number': this.sickLeaveList[0][i].division_number,
                  'challan_number': this.sickLeaveList[0][i].challan_number,
                  'line_number': this.sickLeaveList[0][i].line_number,
                  'mobile_one': this.sickLeaveList[0][i].mobile_one
            
                }

              }
      }
      this.dataSource = new MatTableDataSource(this.sickLeaveList[0]);
    },
    error=>{
        console.log("Error in listing sick leave");
    });
  }
 
   /*----------------------- Sick Approve List Count by date range ----------- */
  getSickLeaveApproveCountByDateRange(formdata)
  {
    let sickLeaveListCount =[];
    this.totalTodaysRegCount =0;
    this.sickLeaveApprovalCount =0;
    let dataval;
    let countData;

    this.commonservice.getSickLeaveApproveCountByDateRange(formdata).then(data=>{
      dataval = data;
      countData = dataval.result;
      //console.log(countData);
      this.totalTodaysRegCount=countData.totalRegister;
      this.sickLeaveApprovalCount = countData.totalApproved;
    },error=>{
      console.log("Error in listing sick leave count");
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
               //this.getSickApproveList();
              // this.getSickLeaveApproveCount();

               this.getSickApproveListByDateRange(this.SearchForm.value);
               this.getSickLeaveApproveCountByDateRange(this.SearchForm.value);
              }
      },
      error=>{
        console.log("Error in sick approve update");
      }
      
      
    );

  }
  



  
  /*----------------------- Approved Sickleave by date range order by approve apply datedate ----------- */
  
  getApprovedSickLeaveByDate(formdata){
    //approvedsickLeaveList
    this.approvedsickLeaveList=[];
    this.recordsFound2  = false;
    let dataval;
    let approvedsickLeaveData;
    this.commonservice.getApprovedSickLeaveByDate(formdata).then(data=>{
      dataval =data;
      
      approvedsickLeaveData = dataval.approvedsickleaveList;
      console.log(approvedsickLeaveData);
      this.approvedsickLeaveList.push(approvedsickLeaveData);
      const tcount = this.approvedsickLeaveList[0].length;
  
  
      if(tcount>0){
        this.recordsFound2 = true;
        for(let i = 0; i<tcount; i++){

          this.approvedexceldata[i]={
            'approved_dt': this.approvedsickLeaveList[0][i].approved_on,
            'total': this.approvedsickLeaveList[0][i].approvedcount,
           
      
          }

        }
            
      }
      this.dataSource2 = new MatTableDataSource(this.approvedsickLeaveList[0]);
    },
    error=>{
        console.log("Error in listing sick leave");
    });
  }


  onSearchApproval() {
    this.recordsFound=false;
    this.recordsFound2=false;
    this.sickLeaveList=[];
    this.approvedsickLeaveList=[];

    // new addition
    if(this.SearchForm.controls['searchTypeCtrl'].value=='SUMMARY'){
      this.countbuttons=false;
    this.getApprovedSickLeaveByDate(this.SearchForm.value);
   }else{
    this.countbuttons=true;
    this.getSickApproveListByDateRange(this.SearchForm.value);
    this.getSickLeaveApproveCountByDateRange(this.SearchForm.value);
   }

  }

  backToList(){
    this.router.navigateByUrl('panel/todaysnewreg');
  }

  exportAsXLSXSickLeaveApproval():void {
    this.excelService.exportAsExcelFile(this.exceldata, 'sickleave_list');
  }

  exportAsXLSXApprovedSickLeave():void {
    this.excelService.exportAsExcelFile(this.approvedexceldata, 'approved_sickleave_count');
  }


  approvedsickLeaveDetailsDialog(rowdata) {
    console.log(rowdata);
    this.openSickapprovalEntryDialog(rowdata);
  }


  openSickapprovalEntryDialog(rowdata) {




    
    const dialogRef = this.dialog.open(ApprovedsickleavedetailsdialogComponent, {
      width: '800px',
      height:'350px',
      disableClose: true,
      data:  rowdata
    });
  
    dialogRef.afterClosed().subscribe(result => {

      // var serachDate=this.searchForm.get("searchFromDateCtrl").value;
      // if(result.from == "Save") {
      //   this.openSnackBar("Sick leave applied successfully");
      //   this.getTodaysRegForDocByRegType("CONSULTATION","N",serachDate);
      //   this.getTodaysRegByRegTypeCount("CONSULTATION","N",serachDate);
      //   this.getTodaysAttendentVisitedCount('Y',serachDate);
      // }

     
    });
  }

} // end of class


  



