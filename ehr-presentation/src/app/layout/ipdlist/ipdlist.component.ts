import { Component, OnInit, ViewChild ,  ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../service/common.service';
import { RegistrationService } from '../../service/registration.service';
import { DatashareService } from '../../service/datashare.service';
import { Router } from '@angular/router';
import { PhramcyService } from '../../service/phramcy.service';
import { IpdService } from '../../service/ipd.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';
import { ConfirmationdischargeComponent } from '../components/confirmationdischarge/confirmationdischarge.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { ExcelService } from '../../service/excel.service';


@Component({
  selector: 'app-ipdlist',
  templateUrl: './ipdlist.component.html',
  styleUrls: ['./ipdlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IpdlistComponent implements OnInit {

  public selectedTab = 0;
  pharmacyListsrchForm: FormGroup;
  SearchForm : FormGroup;
  SearchFormDischarge : FormGroup;
  openReglistBlock = true;
  openVisitedBlock = false;
  dataSource:any;
  dischargeDataSource:any;

  prescriptionList = [];
  dischargedPrescList = [];
  recordsFound = false;
  recordsFoundDischarge= false;
  isButtonActive = true;
  disableClick;
  selectedOption = 'IPD';
  exceldataIPD=[];
  exceldataDischarge=[];

  displayedColumns: string[] = [
  'action',
  'admission_dt',
  'associate_permworker_code',
  'permworker_name',
  'patient_gender',
  'patient_type',
  'patient_name',
  'patient_age',
  'bed_no',
  'room_no',
  'provision_diagnosis'
];

dischargeDisplayedColumns: string[] = [
  'action',
  'admission_dt',
  'discharge_date',
  'associate_permworker_code',
  'permworker_name',
  'patient_gender',
  'patient_type',
  'patient_name',
  'patient_age',
  'bed_no',
  'room_no',
  'provision_diagnosis'
];



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private commonService:CommonService ,
    private registerService: RegistrationService ,
    private datashareService:DatashareService ,
    private router:Router,
    private phramcyService:PhramcyService,
    private ipdService:IpdService,
    public dialog: MatDialog,
    private excelService:ExcelService
  ) {
    
    this.pharmacyListsrchForm = new FormGroup({
      pharmcylistSrchDt : new FormControl((new Date()).toISOString())
    });

    this.SearchForm = new FormGroup({
      searchFromDateCtrl : new FormControl(new Date().toISOString()),
      searchToDateCtrl : new FormControl(new Date().toISOString()),
    });

    this.SearchFormDischarge = new FormGroup({
      searchFromDateCtrldis : new FormControl(new Date().toISOString()),
      searchToDateCtrldis : new FormControl(new Date().toISOString()),
    });
    
    
  }


 
  ngOnInit() {

    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable Ipdlist: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }
  
    this.isButtonActive = true;
    //this.getTodaysRegForDoc("ALL","N");
    

   // this.getIPDPrescriptions(new Date().toDateString()); //comment on 05.03.2019
    this.getIPDPrescriptionsByDateRange(this.SearchForm.value);

    //(document.querySelector('.prescriptionBtn') as HTMLElement).style.display = 'block';
    //(document.querySelector('.prescriptionLoader') as HTMLElement).style.display = 'none';
    (document.querySelector('.customeblockBtn') as HTMLElement).style.display = 'none';

 }

 /*
 searchPrescriptionList(){
   const searchdt = this.pharmacyListsrchForm.get("pharmcylistSrchDt").value;
   this.getIPDPrescriptions(searchdt);
 }
 */

public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
  console.log("Tab"+tabChangeEvent.index);
  this.openReglistBlock = true;
  let tabindx : number;
  tabindx = tabChangeEvent.index;
  if(tabindx == 0){
    console.log("tabindx"+tabindx);
   // this.getIPDPrescriptions(new Date().toDateString());  // commented on 05.03.2019
    this.getIPDPrescriptionsByDateRange(this.SearchForm.value);
  }
  else if(tabindx == 1){
    console.log("tabindx"+tabindx);
    // this.getDischargeIPDPrescriptions(new Date().toDateString()); // commented on 05.03.2019
    
  this.getDischargeIPDPrescriptionsByDateRange(this.SearchFormDischarge.value);
  }
  else {
    console.log("tabindx"+tabindx);
  }
  
}


 getIPDPrescriptions(date) {
    this.prescriptionList = [];
    let dataval;
    let presclist;

    this.ipdService.getIPDPrescriptionsList(date).then(data => {
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
     console.log("error in todays ipd list");
   });

  }

  /*----------------------- IPD list by date range ----------- */

  getIPDPrescriptionsByDateRange(formdata) {
    this.prescriptionList = [];
    let dataval;
    let presclist;

    this.ipdService.getIPDPrescriptionsListByDateRange(formdata).then(data => {
      dataval = data;
      presclist = dataval.result;
      this.prescriptionList.push(presclist);
      console.log(this.prescriptionList);
    //  this.exceldataIPD=this.prescriptionList[0];
      const tcount = this.prescriptionList[0].length;
      
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.prescriptionList[0]);
       
        for(let i = 0; i<tcount; i++){

          this.exceldataIPD[i]={
            'Admission_dt': this.prescriptionList[0][i].admission_dt,
            'Permanent_Worker': this.prescriptionList[0][i].associate_permworker_code,
            'Gender': this.prescriptionList[0][i].patient_gender,
            'Patient_Type': this.prescriptionList[0][i].patient_type,
            'Name': this.prescriptionList[0][i].patient_name,
            'Age': this.prescriptionList[0][i].patient_age,
            'Bed_No': this.prescriptionList[0][i].bed_no,
            'Room_No': this.prescriptionList[0][i].room_no,
            'Provisional_Diagnosis': this.prescriptionList[0][i].provision_diagnosis,
          }

        }
        console.log(this.exceldataIPD);


      }else{
        this.recordsFound = false;

      }
     
    } ,
    error => {
     console.log("error in todays ipd list");
   });

  }

  getDischargeIPDPrescriptions(date) {
    this.dischargedPrescList = [];
    let dataval;
    let presclist;

    this.ipdService.getDischargeIPDPrescriptions(date).then(data => {
      this.dischargedPrescList = [];
      dataval = data;
      presclist = dataval.result;
      this.dischargedPrescList.push(presclist);

      console.log(this.dischargedPrescList);

      const tcount = this.dischargedPrescList[0].length;


      if(tcount > 0){
        //this.recordsFound = true;
        this.dischargeDataSource = new MatTableDataSource(this.dischargedPrescList[0]);
      }
     
    } ,
    error => {
     console.log("error in discharge ipd list");
   });

  }


  /* discharge by date range added on 05.03.2019 */

  getDischargeIPDPrescriptionsByDateRange(formdata) {
    this.dischargedPrescList = [];
    let dataval;
    let presclist;

    this.ipdService.getDischargeIPDPrescriptionsByDateRange(formdata).then(data => {
      this.dischargedPrescList = [];
      dataval = data;
      presclist = dataval.result;
      this.dischargedPrescList.push(presclist);

      console.log(this.dischargedPrescList);

      const tcount = this.dischargedPrescList[0].length;


      if(tcount > 0){
        this.recordsFoundDischarge=true;
        this.dischargeDataSource = new MatTableDataSource(this.dischargedPrescList[0]);

        for(let i = 0; i<tcount; i++){

          this.exceldataDischarge[i]={
            'Admission_dt': this.dischargedPrescList[0][i].admission_dt,
            'Discharge_date': this.dischargedPrescList[0][i].discharge_date,
            'Permanent_Worker': this.dischargedPrescList[0][i].associate_permworker_code,
            'Permanent_Worker_Name': this.dischargedPrescList[0][i].permworker_name,
            'Gender': this.dischargedPrescList[0][i].patient_gender,
            'Patient_Type': this.dischargedPrescList[0][i].patient_type,
            'Name': this.dischargedPrescList[0][i].patient_name,
            'Age': this.dischargedPrescList[0][i].patient_age,
            'Bed_No': this.dischargedPrescList[0][i].bed_no,
            'Room_No': this.dischargedPrescList[0][i].room_no,
            'Provisional_Diagnosis': this.dischargedPrescList[0][i].provision_diagnosis,
          }

        }
        console.log(this.exceldataDischarge);
      }else{
        this.recordsFoundDischarge=false;
      }
     
    } ,
    error => {
     console.log("error in discharge ipd list");
   });

  }
 

  getIPDRegDetail(event,data) {
  (document.querySelector('#ipdVisitRowBtn_'+data.ipdID) as HTMLElement).style.display = 'none';
  (document.querySelector('#ipdVisitRowWaitBtn_'+data.ipdID) as HTMLElement).style.display = 'inline-block';
  this.datashareService.setIPDRowData(data);
  this.router.navigate(['/panel/ipdvisit']);
  
}


ipdDischarge(event,data) {
  (document.querySelector('#dischargerowBtn_'+data.ipdID) as HTMLElement).style.display = 'none';
  (document.querySelector('#ipdDischargeRowWaitBtn_'+data.ipdID) as HTMLElement).style.display = 'inline-block';
  this.datashareService.setIPDDischargeRowData(data);
  this.router.navigate(['/panel/discharge']);
}

ipdDischargedPreview(event,data) {
  (document.querySelector('#dischargePreviewBtn_'+data.ipdID) as HTMLElement).style.display = 'none';
  (document.querySelector('#dischargePreviewWaitBtn_'+data.ipdID) as HTMLElement).style.display = 'inline-block';
  this.datashareService.setIPDDischargeRowData(data);
  this.router.navigate(['/panel/discharge']);
}

removeIPDDischarge(event,row){
  // console.log('#dischargerowBtn_'+row.ipdID);
  (document.querySelector('#dischargeRemoveBtn_'+row.ipdID) as HTMLElement).style.display = 'none';
  (document.querySelector('#dischargeRemoveWaitBtn_'+row.ipdID) as HTMLElement).style.display = 'inline-block';
  this.openConfirmationDialog(row.ipdID);
}



openConfirmationDialog(delid) {
  const dialogRef = this.dialog.open(ConfirmationdischargeComponent, {
    width: '350px',
    disableClose: true,
    data:  {
      msg : 'Do you want to remove ?',
      msgicon : 'delete_forever',
      iconcolor: '#696766',
      btnurl : 'panel/ipdlist',
      delid: delid
      }
  });

  dialogRef.afterClosed().subscribe(result => {

    console.log(result);
    console.log(result.from)

    if(result.from == "SAVE") {
      console.log("Save");
      this.dischargedPrescList = [];
      this.dischargeDataSource = new MatTableDataSource(this.dischargedPrescList);
      //this.getDischargeIPDPrescriptions(new Date().toDateString()); // commented on 05.03.2019
      this.getDischargeIPDPrescriptionsByDateRange(this.SearchForm.value);
    }
    else{
      (document.querySelector('#dischargeRemoveBtn_'+delid) as HTMLElement).style.display = 'inline-block';
      (document.querySelector('#dischargeRemoveWaitBtn_'+delid) as HTMLElement).style.display = 'none';
    }
   
  });

}


backToIpdList() {
  this.router.navigateByUrl('panel/doctor');
}

// added on 05.03.2019
onSearchIPD() {
 this.getIPDPrescriptionsByDateRange(this.SearchForm.value);
}

onSearchDischarge() {
  this.getDischargeIPDPrescriptionsByDateRange(this.SearchFormDischarge.value);
}

exportAsXLSXIPD():void {
  this.excelService.exportAsExcelFile(this.exceldataIPD, 'ipd_list');
}

exportAsXLSXDischarge():void {
  this.excelService.exportAsExcelFile(this.exceldataDischarge, 'discharge_list');
}

} // end of class
