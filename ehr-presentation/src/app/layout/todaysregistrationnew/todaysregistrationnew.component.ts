import {Component, OnInit, ViewChild , ViewEncapsulation } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { CommonService } from '../../service/common.service';
import { MatTabChangeEvent } from '@angular/material';
import { RegistrationService } from '../../service/registration.service';
import { DatashareService } from '../../service/datashare.service';
import { Router } from '@angular/router';
import { SickentrydialogComponent } from '../components/sickentrydialog/sickentrydialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todaysregistrationnew',
  templateUrl: './todaysregistrationnew.component.html',
  styleUrls: ['./todaysregistrationnew.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TodaysregistrationnewComponent implements OnInit {

  openReglistBlock = true;
  openVisitedBlock = false;
  dataSource;
  todaysregistrationListCount = [];
  todaysregistrationList = [];
  patientTypeList = [];
  recordsFound = false;
  isButtonActive = true;
  searchForm : FormGroup;
  activeTab=0;

  allcount = 0;
  pwcount = 0;
  twcount = 0;
  depcount = 0;
  nwcount = 0;

  consultCount = 0;
  pregnancyCount = 0;
  vaccinationCount = 0;


  consultCountVisited = 0;
  pregnancyCountVisited = 0;
  vaccinationCountVisited = 0;

  totalCountVisited=0;



  allcountVisited = 0;
  pwcountVisited = 0;
  twcountVisited = 0;
  depcountVisited = 0;
  nwcountVisited = 0;
  

  displayedColumns: string[] = [
  'action',
  //'reg_type',
  'patient_name',
  'patient_type',
 // 'date_of_registration',
 //'patient_code',
  'parmanent_wrk_code',
  'birthdate',
  'age',
  'gender', 
  'division_number' ,
  'challan_number' ,
  'line_number' ,
  // 'mobile_one',
  //'adhar',
  
];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tabLoadTimes: Date[] = [];
  constructor(private commonService:CommonService ,private registerService: RegistrationService , private datashareService:DatashareService , private router:Router,public dialog: MatDialog, public snackBar: MatSnackBar) {
    console.log("Data service " + this.datashareService.sharedData);


    this.searchForm = new FormGroup({
      searchFromDateCtrl : new FormControl(new Date().toISOString())
 
    });

  }

  step = 0;

  setStep(index: number) {
    this.step = index;
    var serachDate=this.searchForm.get("searchFromDateCtrl").value;
      if(this.step == 0){
        this.getTodaysRegForDocByRegType("CONSULTATION","Y",serachDate);
      }
      else if(this.step == 1){
        this.getTodaysRegForDocByRegType("PREGNANCY","Y",serachDate);
      }
      else if(this.step == 2){
        this.getTodaysRegForDocByRegType("VACCINATION","Y",serachDate);
      }


  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  firstTab(e){
    //console.log("fgdsf"+e);
  }
  ngOnInit() {
   this.isButtonActive = true;
   var serachDate=this.searchForm.get("searchFromDateCtrl").value;
   this.getTodaysRegForDocByRegType("CONSULTATION","N",serachDate);

   this.getTodaysRegByRegTypeCount("CONSULTATION","N",serachDate);
   this.getTodaysRegByRegTypeCount("PREGNANCY","N",serachDate);
   this.getTodaysRegByRegTypeCount("VACCINATION","N",serachDate);

   this.getTodaysAttendentVisitedCount('Y',serachDate);
   
   //(document.querySelector('.opdLoder') as HTMLElement).style.display = 'none';
  }

 

  

  



  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    
    this.openReglistBlock = true;
    let tabindx;
    tabindx = tabChangeEvent.index;
    this.activeTab=tabindx;
    var serachDate=this.searchForm.get("searchFromDateCtrl").value;
    if(tabindx == 0){
      this.getTodaysRegForDocByRegType("CONSULTATION","N",serachDate);
    }
    else if(tabindx == 1){
      this.getTodaysRegForDocByRegType("PREGNANCY","N",serachDate);
    }
    else if(tabindx == 2){
      this.getTodaysRegForDocByRegType("VACCINATION","N",serachDate);
    }
    else if(tabindx == 3){
      this.openReglistBlock = false;
      this.getTodaysRegByRegTypeVisitedCount("CONSULTATION","Y",serachDate);
      this.getTodaysRegByRegTypeVisitedCount("PREGNANCY","Y",serachDate);
      this.getTodaysRegByRegTypeVisitedCount("VACCINATION","Y",serachDate);
    }
    this.getTodaysAttendentVisitedCount('Y',serachDate);
    
}





  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  getPatientType(){
  
    let dataval;
    let patienttypelist;
    this.commonService.getPatientType().then(data => {
      dataval = data;
      patienttypelist = dataval.result;
      this.patientTypeList.push(patienttypelist);
    },
    error => {
     console.log("There is some error in Estate List...");
   });
  }



  getTodaysRegForDocByRegType(type,serve,serachDate) {

    this.todaysregistrationList = [];
    this.recordsFound  = false;
    let dataval;
    let regdata;

    this.registerService.getTodaysRegByRegType(type,serve,serachDate).then(data => {
      dataval = data;
      regdata = dataval.todaysreg_data;
      this.todaysregistrationList.push(regdata);
      const tcount = this.todaysregistrationList[0].length;

     if(tcount > 0){
       this.recordsFound = true;
     }
      this.dataSource = new MatTableDataSource(this.todaysregistrationList[0]);
      
    },
    error => {
     console.log("error in todays registration list");
   });
  }




  getTodaysRegByRegTypeCount(type,serve,serachDate) {
    this.todaysregistrationListCount = [];
    let dataval;
    let regdata;
    this.registerService.getTodaysRegByRegType(type,serve,serachDate).then(data => {
      dataval = data;
      regdata = dataval.todaysreg_data;
      this.todaysregistrationListCount = [];
      this.todaysregistrationListCount.push(regdata);
      let tcount =  0;
      tcount = this.todaysregistrationListCount[0].length;

      
      if(type == "CONSULTATION"){
        this.consultCount = tcount ;
      }
      else if(type == "PREGNANCY"){
        this.pregnancyCount = tcount ;
      }
      else if(type == "VACCINATION"){
       this.vaccinationCount = tcount ;
      }
     

    },
    error => {
     console.log("error in new todays registration list");
   });
  }

  getTodaysRegForDocCount(type,serve) {
    this.todaysregistrationListCount = [];
    let dataval;
    let regdata;
    this.registerService.getTodaysRegForDoc(type,serve).then(data => {
      dataval = data;
      regdata = dataval.todaysreg_data;
      this.todaysregistrationListCount = [];
      this.todaysregistrationListCount.push(regdata);
      let tcount =  0;
      tcount = this.todaysregistrationListCount[0].length;

      if(type == "ALL"){
        this.allcount = tcount ;
      }
      else if(type == "P/W"){
        this.pwcount = tcount ;
      }
      else if(type == "T/W"){
       this.twcount = tcount ;
      }
      else if(type == "Dep"){
        this.depcount = tcount ; 
      }
      else if(type == "N/W"){
        this.nwcount = tcount ;
      }

    },
    error => {
     console.log("error in todays registration list");
   });
  }



  
  getTodaysRegByRegTypeVisitedCount(type,serve,serachDate) {
    this.todaysregistrationListCount = [];
    let dataval;
    let regdata;
    this.registerService.getTodaysRegByRegType(type,serve,serachDate).then(data => {
      dataval = data;
      regdata = dataval.todaysreg_data;
      this.todaysregistrationListCount = [];
      this.todaysregistrationListCount.push(regdata);
      let tcount =  0;
      tcount = this.todaysregistrationListCount[0].length;

      if(type == "CONSULTATION"){
        this.consultCountVisited = tcount ;
      }
      else if(type == "VACCINATION"){
        this.vaccinationCountVisited = tcount ;
      }
      else if(type == "PREGNANCY"){
        this.pregnancyCountVisited = tcount ;
      }
      
    },
    error => {
     console.log("error in todays new registration list");
   });
  }

  /* Attendent count */

  getTodaysAttendentVisitedCount(serve,serachDate) {
    this.todaysregistrationListCount = [];
    let dataval;
    let regdata;
    this.registerService.getTodaysAttendentCount(serve,serachDate).then(data => {
      dataval = data;
      regdata = dataval.todaysreg_data;
      this.todaysregistrationListCount = [];
      this.todaysregistrationListCount.push(regdata);
      let tcount =  0;
      tcount = this.todaysregistrationListCount[0].length;
      console.log('Total Attendent:'+tcount);
      this.totalCountVisited=tcount;
      
    },
    error => {
     console.log("error in todays new registration list");
   });
  }



  getTodaysRegForDocCountVisited(type,serve) {
    this.todaysregistrationListCount = [];
    let dataval;
    let regdata;
    this.registerService.getTodaysRegForDoc(type,serve).then(data => {
      dataval = data;
      regdata = dataval.todaysreg_data;
      this.todaysregistrationListCount = [];
      this.todaysregistrationListCount.push(regdata);
      let tcount =  0;
      tcount = this.todaysregistrationListCount[0].length;

      if(type == "ALL"){
        this.allcountVisited = tcount ;
      }
      else if(type == "P/W"){
        this.pwcountVisited = tcount ;
      }
      else if(type == "T/W"){
       this.twcountVisited = tcount ;
      }
      else if(type == "Dep"){
        this.depcountVisited = tcount ; 
      }
      else if(type == "N/W"){
        this.nwcountVisited = tcount ;
      }

    },
    error => {
     console.log("error in todays registration list");
   });
  }


  getPresciption(p){

  (document.querySelector('#opdIssueBtn_'+p.registration_id) as HTMLElement).style.display = 'none';
  (document.querySelector('#opdIssueLoader_'+p.registration_id) as HTMLElement).style.display = 'inline-block';

    this.isButtonActive = false;
    this.datashareService.saveData(p);
    this.router.navigate(['/panel/opd']);

  }

  

  backToIpdList() {
    this.router.navigateByUrl('panel/doctor');
  }

  gotoSickLeaveApprovalList() {
    this.router.navigateByUrl('panel/sickapproval');
  }



  /**
   * Sick Leave Dialog Data Insert
   */

  sickLeaveEntryDialog(rowdata) {
    console.log(rowdata);
    this.openSickEntryDialog(rowdata);
  }


  
  openSickEntryDialog(rowdata) {
    const dialogRef = this.dialog.open(SickentrydialogComponent, {
      width: '400px',
      //height:'550px',
      disableClose: true,
      data:  rowdata
    });
  
    dialogRef.afterClosed().subscribe(result => {
      var serachDate=this.searchForm.get("searchFromDateCtrl").value;
      if(result.from == "Save") {
        this.openSnackBar("Sick leave applied successfully");
        this.getTodaysRegForDocByRegType("CONSULTATION","N",serachDate);
        this.getTodaysRegByRegTypeCount("CONSULTATION","N",serachDate);
        this.getTodaysAttendentVisitedCount('Y',serachDate);
      }
      else if(result.from=="EXIST"){

        this.snackBar.open("Sick leave has been given to the patient.", "Error", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        this.getTodaysRegForDocByRegType("CONSULTATION","N",serachDate);
        this.getTodaysRegByRegTypeCount("CONSULTATION","N",serachDate);
        this.getTodaysAttendentVisitedCount('Y',serachDate);
        // this.openSnackBar("Can not delete .Prescription already done.");
      }


     
    });
  }


  openSnackBar(msg) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    
    this.snackBar.open(msg, "", config);
   
  }


  onSearchBydate(event) {
    console.log(event.value);
   // this.getRegistrationBydate() ;

   var serachDate=this.searchForm.get("searchFromDateCtrl").value;
   console.log(this.activeTab);

   let tabindx = this.activeTab;
   
   var serachDate=this.searchForm.get("searchFromDateCtrl").value;
   if(tabindx == 0){
     this.getTodaysRegForDocByRegType("CONSULTATION","N",serachDate);
    // this.getTodaysRegByRegTypeCount("CONSULTATION","N",serachDate);
   }
   else if(tabindx == 1){
     this.getTodaysRegForDocByRegType("PREGNANCY","N",serachDate);
     //this.getTodaysRegByRegTypeCount("PREGNANCY","N",serachDate);
   }
   else if(tabindx == 2){
     this.getTodaysRegForDocByRegType("VACCINATION","N",serachDate);
     //this.getTodaysRegByRegTypeCount("VACCINATION","N",serachDate);
   }
 
  //  this.getTodaysRegForDocByRegType("CONSULTATION","N",serachDate);
  //  this.getTodaysRegForDocByRegType("PREGNANCY","N",serachDate);
  //  this.getTodaysRegForDocByRegType("VACCINATION","N",serachDate);


  this.getTodaysRegByRegTypeCount("VACCINATION","N",serachDate);
  this.getTodaysRegByRegTypeCount("PREGNANCY","N",serachDate);
  this.getTodaysRegByRegTypeCount("CONSULTATION","N",serachDate);
  
  this.getTodaysAttendentVisitedCount('Y',serachDate);


  } 

}// end of class
