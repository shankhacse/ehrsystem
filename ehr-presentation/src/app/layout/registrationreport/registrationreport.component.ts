import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild , ViewEncapsulation } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import { MatSelect, VERSION } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommonService } from '../../service/common.service';
import { SymptomdiseaseService } from '../../service/symptomdisease.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatashareService } from '../../service/datashare.service';
import { PatientService } from '../../service/patient.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { IpdService } from '../../service/ipd.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ExcelService } from '../../service/excel.service';
import { RegistrationService } from '../../service/registration.service';


@Component({
  selector: 'app-registrationreport',
  templateUrl: './registrationreport.component.html',
  styleUrls: ['./registrationreport.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationreportComponent implements OnInit {

  patientTypeList = [];
  version = VERSION;
  

  registrationSearchForm : FormGroup;
  validFormErr:string = "";
  issuedRecordFound = false;
  recordsFound = false;
  dataSource:any;

  registrationList=[];

  exceldata=[];

  

  constructor(  private router:Router, private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog , private registerService: RegistrationService,
    private excelService:ExcelService) {
      this.registrationSearchForm = new FormGroup({
        searchFromDateCtrl : new FormControl(new Date().toISOString()),
        searchToDateCtrl : new FormControl(new Date().toISOString()),
        regTypeCtrl : new FormControl(''),
        patTypeCtrl : new FormControl('')
       
      });
     }

  ngOnInit() {
    this.getPatientType('patient_type');
  }

  getPatientType(tablename){
    let dataval;
    let patienttypelist;
    this.commonService.getDropdownData(tablename).then(data => {
     
      dataval = data;
      patienttypelist = dataval.result;
      this.patientTypeList.push(patienttypelist);
    },
    error => {
     console.log("There is some error in Estate List...");
   });
  }

  displayedColumns: string[] = [
                                'slno',
                                'reg_date',
                                'reg_type', 
                                'patient_type', 
                                'patientID', 
                                'challanno',
                                'division',
                                'lineno'];

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  onSubmit() {
    this.registrationList = [];
    let dataval;
    let list;
    console.log("fdt:"+this.registrationSearchForm.get("searchFromDateCtrl").value);
    
    var fromdate= this.registrationSearchForm.get("searchFromDateCtrl").value.toLocaleString();

    var todate=this.registrationSearchForm.get("searchToDateCtrl").value.toLocaleString();

  console.log(this.registrationSearchForm.value);
    this.registerService.getPatientRegistrationByDate(this.registrationSearchForm.value,fromdate,todate).then(data => {
      dataval = data;
      this.issuedRecordFound  = false;
      list = dataval.result;
      this.registrationList.push(list);
      console.log(this.registrationList[0]);
      this.exceldata=this.registrationList[0];
      const tcount = this.registrationList[0].length;
      if(tcount <= 0) {
        this.issuedRecordFound  = true;
      }
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.registrationList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
     
     
    } ,
    error => {
     console.log("error in registration list");
   });

  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.exceldata, 'registration');
 }


 getPatientByType() {
 
  console.log("test");
 }


}// end of class
