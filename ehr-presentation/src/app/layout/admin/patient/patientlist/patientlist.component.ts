import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../../service/common.service';
import { DatashareService } from './../../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { take, takeUntil } from 'rxjs/operators';
import { PatientbarcodedialogComponent } from '../../components/patientbarcodedialog/patientbarcodedialog.component';







interface Group {
  id: string;
  name: string;
}

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  addPatientListForm : FormGroup;
  patientsList = []; 
  patientsTypeList = []; 
  isPageloded=false;

  
  dataSource:any;
  recordsFound = false;

  

 
  validFormErr:string = "";

  displayedColumns: string[] = [
    'slno',
    'estate',
    'patient_code',
    'patient_name',
    'dr_type',
    
    'gender',
    //'mobile_one',
    //'mobile_two',
    'challan_number',
    'currant_status',
    'dateofbirth',
    'division_number',
    'line_number',
    'house_no',
    'barcode'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;




  barCodeButtonEnable:boolean = false;

  constructor(
    private router:Router,
    private commonService:CommonService,
    private datashareService:DatashareService ,
    public dialog: MatDialog
    
  ) { 
    this.addPatientListForm = new FormGroup({ 
      
      patientTypeCtrl: new FormControl(''), 
    });
  }
  private groups: Group[] = [];
  public filtergroups: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);
  ngOnInit() {
    this.getPatientType('patient_type'); //@param--tablename

   // this.getPatientList(1);
    
  }

  getPatientType(tablename) {
   
    let dataval;
    let patienttypelist;
    this.commonService.getDropdownData(tablename).then(data => {
      this.patientsTypeList = [];
      dataval = data;
      patienttypelist = dataval.result;
      this.patientsTypeList.push(patienttypelist);
      console.log(this.patientsTypeList);
    },
    error => {
     console.log("There is some error in patient List...");
   });
  }

  getPatientList(patient_type_id) {
    this.patientsList = [];
    let dataval;
    let patientlist;

    this.commonService.getPatientListData(patient_type_id).then(data => {
      dataval = data;
      patientlist = dataval.result;
    this.patientsList = [];
    this.patientsList.push(patientlist);
      console.log(this.patientsList);
      const tcount = this.patientsList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.patientsList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
     
    } ,
    error => {
     console.log("error in todays investigation list");
   });

  }

  onSubmit(formdata) {
    console.log(this.addPatientListForm.controls['patientTypeCtrl'].value);

    this.getPatientList(this.addPatientListForm.controls['patientTypeCtrl'].value);
    this.isPageloded=true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  patientBarcodeDialog(rowdata) {
    console.log(rowdata);
    this.openPatientBarCodeDialog(rowdata);
  }


  openPatientBarCodeDialog(rowdata) {
    const dialogRef = this.dialog.open(PatientbarcodedialogComponent, {
      width: '300px',
      //height:'550px',
      disableClose: true,
      data:  rowdata
    });
  
    dialogRef.afterClosed().subscribe(result => {

      /*
      var serachDate=this.searchForm.get("searchFromDateCtrl").value;
      if(result.from == "Save") {
        this.openSnackBar("Sick leave applied successfully");
        this.getTodaysRegForDocByRegType("CONSULTATION","N",serachDate);
        this.getTodaysRegByRegTypeCount("CONSULTATION","N",serachDate);
        this.getTodaysAttendentVisitedCount('Y',serachDate);
      }
      */

     
    });
  }


  getAllBarcodes(){
    this.router.navigate(['panel/barcodelist']);
  }

  patientTypeChange(val){
   if(val==1){
     // 1 == Permament Patient
     this.barCodeButtonEnable = true;
   }
   else{
    this.barCodeButtonEnable = false;
   }

  }


}
