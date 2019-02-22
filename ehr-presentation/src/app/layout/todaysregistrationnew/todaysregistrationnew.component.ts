import {Component, OnInit, ViewChild , ViewEncapsulation } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { CommonService } from '../../service/common.service';
import { MatTabChangeEvent } from '@angular/material';
import { RegistrationService } from '../../service/registration.service';
import { DatashareService } from '../../service/datashare.service';
import { Router } from '@angular/router';


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



  allcountVisited = 0;
  pwcountVisited = 0;
  twcountVisited = 0;
  depcountVisited = 0;
  nwcountVisited = 0;
  

  displayedColumns: string[] = [
  'action',
  //'reg_type',
  'patient_code',
  'patient_name',
  'birthdate',
  'gender', 
  'division_number' ,
  'challan_number' ,
  'line_number' ,
  'mobile_one',
  'adhar'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tabLoadTimes: Date[] = [];
  constructor(private commonService:CommonService ,private registerService: RegistrationService , private datashareService:DatashareService , private router:Router) {
    console.log("Data service " + this.datashareService.sharedData);
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
   
      if(this.step == 0){
        this.getTodaysRegForDocByRegType("CONSULTATION","Y");
      }
      else if(this.step == 1){
        this.getTodaysRegForDocByRegType("PREGNANCY","Y");
      }
      else if(this.step == 2){
        this.getTodaysRegForDocByRegType("VACCINATION","Y");
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
   this.getTodaysRegForDocByRegType("CONSULTATION","N");

   this.getTodaysRegByRegTypeCount("CONSULTATION","N");
   this.getTodaysRegByRegTypeCount("PREGNANCY","N");
   this.getTodaysRegByRegTypeCount("VACCINATION","N");
   
   //(document.querySelector('.opdLoder') as HTMLElement).style.display = 'none';
  }



  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    
    this.openReglistBlock = true;
    let tabindx;
    tabindx = tabChangeEvent.index;

    if(tabindx == 0){
      this.getTodaysRegForDocByRegType("CONSULTATION","N");
    }
    else if(tabindx == 1){
      this.getTodaysRegForDocByRegType("PREGNANCY","N");
    }
    else if(tabindx == 2){
      this.getTodaysRegForDocByRegType("VACCINATION","N");
    }
    else if(tabindx == 3){
      this.openReglistBlock = false;
      this.getTodaysRegByRegTypeVisitedCount("CONSULTATION","Y");
      this.getTodaysRegByRegTypeVisitedCount("PREGNANCY","Y");
      this.getTodaysRegByRegTypeVisitedCount("VACCINATION","Y");
    }
    
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



  getTodaysRegForDocByRegType(type,serve) {

    this.todaysregistrationList = [];
    this.recordsFound  = false;
    let dataval;
    let regdata;

    this.registerService.getTodaysRegByRegType(type,serve).then(data => {
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




  getTodaysRegByRegTypeCount(type,serve) {
    this.todaysregistrationListCount = [];
    let dataval;
    let regdata;
    this.registerService.getTodaysRegByRegType(type,serve).then(data => {
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



  
  getTodaysRegByRegTypeVisitedCount(type,serve) {
    this.todaysregistrationListCount = [];
    let dataval;
    let regdata;
    this.registerService.getTodaysRegByRegType(type,serve).then(data => {
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


}
