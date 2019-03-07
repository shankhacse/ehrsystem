import { Component, OnInit, ViewChild ,  ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../service/common.service';
import { RegistrationService } from '../../service/registration.service';
import { DatashareService } from '../../service/datashare.service';
import { Router } from '@angular/router';
import { PhramcyService } from '../../service/phramcy.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';



@Component({
  selector: 'app-pharmacymedicinelist',
  templateUrl: './pharmacymedicinelist.component.html',
  styleUrls: ['./pharmacymedicinelist.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PharmacymedicinelistComponent implements OnInit {

  pharmacyListsrchForm: FormGroup;
  openReglistBlock = true;
  openVisitedBlock = false;
  dataSource;
  dataSourceIPD;

  prescriptionList = [];
  recordsFound = false;
  isButtonActive = true;


  ipdPrescriptionList = [];
  ipdRecordsFound = false;
  ipdIsButtonActive = true;


  displayedColumns: string[] = [
    'action',
    'prescription_No',
    'prescDate',
    'patient_code',
    'patient_name',
    'mobile_one'
];

displayedColumnsIPD: string[] = [
  'action',
  'prescription_ID',
  'prescDate',
  'patient_code',
  'patient_name',
  'patient_gender',
  'associate_permworker_code'
];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private commonService:CommonService ,
    private registerService: RegistrationService ,
    private datashareService:DatashareService ,
    private router:Router,
    private phramcyService:PhramcyService
  ) {
    
    /*
    this.pharmacyListsrchForm = new FormGroup({
      pharmcylistSrchDt : new FormControl((new Date()).toISOString())
    });

    */
    
    
  }


 
  ngOnInit() {
    this.isButtonActive = true;
    //this.getTodaysRegForDoc("ALL","N");
    
    this.getOPDPrescriptionsForPharmcy(new Date().toDateString());
    (document.querySelector('.prescriptionBtn') as HTMLElement).style.display = 'block';
    (document.querySelector('.prescriptionLoader') as HTMLElement).style.display = 'none';

 }

 /*
 searchPrescriptionList(){
   const searchdt = this.pharmacyListsrchForm.get("pharmcylistSrchDt").value;
   this.getOPDPrescriptionsForPharmcy(searchdt);
 }
 */

  getOPDPrescriptionsForPharmcy(date){
    this.prescriptionList = [];
    let dataval;
    let presclist;

    this.phramcyService.getPrescriptionsListForPharmcy(date).then(data => {
      dataval = data;
      presclist = dataval.result;
      this.prescriptionList.push(presclist);
      console.log(this.prescriptionList);
      const tcount = this.prescriptionList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.prescriptionList[0]);
      }
     
    } ,
    error => {
     console.log("error in todays pharamcy medicine list");
   });

  }

  getIPDPrescriptionsForPharmcy(date) {

    this.ipdPrescriptionList = [];
    let dataval;
    let ipdpresclist;

    this.phramcyService.getIPDPrescriptionsListForPharmcy(date).then(data => {
      this.ipdPrescriptionList = [];
      dataval = data;
      ipdpresclist = dataval.result;
      this.ipdPrescriptionList.push(ipdpresclist);
      console.log(this.ipdPrescriptionList);
      const tcount = this.ipdPrescriptionList[0].length;
      if(tcount > 0){
        //this.ipdRecordsFound = true;
        this.dataSourceIPD = new MatTableDataSource(this.ipdPrescriptionList[0]);

        console.log("Record Found "+this.ipdRecordsFound);
      }
     
    } ,
    error => {
     console.log("error in todays pharamcy medicine list");
   });

  }


  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.openReglistBlock = true;
    let tabindx;
    tabindx = tabChangeEvent.index;
    if(tabindx == 0){
      console.log("tabindx"+tabindx);
      this.getOPDPrescriptionsForPharmcy(new Date().toDateString());
    }
    else if(tabindx == 1){
      console.log("tabindx"+tabindx);
      this.getIPDPrescriptionsForPharmcy(new Date().toDateString());
    }
    else {
      console.log("tabindx"+tabindx);
    }
    
}





/*
  getTodaysRegForDoc(type,serve) {
    this.todaysregistrationList = [];
    this.recordsFound  = false;
    let dataval;
    let regdata;
    this.registerService.getTodaysRegForDoc(type,serve).then(data => {
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
 */



getOPDMedicineByPresciption(event,data){
  console.log(event); 
  //console.log(event.target.id); 
  
  (document.querySelector('#prescriptrowBtn_'+data.prescription_ID) as HTMLElement).style.display = 'none';
  (document.querySelector('#prescriptrowLoader_'+data.prescription_ID) as HTMLElement).style.display = 'block';
 // console.log(data);
  
  this.datashareService.savePrescriptionRowData(data);
  this.router.navigate(['/panel/medicineissue']);
  
   
}

getIPDMedicineByPresciption(event,data){
  console.log(event); 
  //console.log(event.target.id); 
  
  (document.querySelector('#ipdprescriptrowBtn_'+data.prescription_ID) as HTMLElement).style.display = 'none';
  (document.querySelector('#ipdprescriptrowLoader_'+data.prescription_ID) as HTMLElement).style.display = 'block';
  this.datashareService.savePrescriptionRowData(data);
  this.router.navigate(['/panel/medicineissue']);
   
}


importGrn(){
  this.router.navigate(['/panel/grn']);
}

}// end of class
