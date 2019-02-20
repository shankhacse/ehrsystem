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



@Component({
  selector: 'app-ipdlist',
  templateUrl: './ipdlist.component.html',
  styleUrls: ['./ipdlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IpdlistComponent implements OnInit {

  
  pharmacyListsrchForm: FormGroup;
  openReglistBlock = true;
  openVisitedBlock = false;
  dataSource:any;
  dischargeDataSource:any;

  prescriptionList = [];
  dischargedPrescList = [];
  recordsFound = false;
  isButtonActive = true;


  displayedColumns: string[] = [
  'action',
  'admission_dt',
  'associate_permworker_code',
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
  'associate_permworker_code',
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
    public dialog: MatDialog
  ) {
    
    this.pharmacyListsrchForm = new FormGroup({
      pharmcylistSrchDt : new FormControl((new Date()).toISOString())
    });
    
    
  }


 
  ngOnInit() {

    
  
    this.isButtonActive = true;
    //this.getTodaysRegForDoc("ALL","N");
    
    this.getIPDPrescriptions(new Date().toDateString());
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
  this.openReglistBlock = true;
  let tabindx : number;
  tabindx = tabChangeEvent.index;
  if(tabindx == 0){
    console.log("tabindx"+tabindx);
    this.getIPDPrescriptions(new Date().toDateString());
  }
  else if(tabindx == 1){
    console.log("tabindx"+tabindx);
     this.getDischargeIPDPrescriptions(new Date().toDateString());
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
      this.getDischargeIPDPrescriptions(new Date().toDateString());
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


}
