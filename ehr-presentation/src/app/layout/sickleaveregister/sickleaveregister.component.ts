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



interface PatientCode{
  id: string,
  code: string,
  name : string
}

export interface PatientInfo{
  id: string,
  code: string,
  name : string,
  lineno : any,
  challan: any,
  house:any
}


interface PatientAadhar{
  id: string,
  aadhar: string ,
  name: string
}


@Component({
  selector: 'app-sickleaveregister',
  templateUrl: './sickleaveregister.component.html',
  styleUrls: ['./sickleaveregister.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SickleaveregisterComponent implements OnInit {

  filteredPatients: Observable<PatientInfo[]>;

  patientinfo:PatientInfo[] = [];

  

  version = VERSION;
  

  issuedSickleaveSearchForm : FormGroup;
  validFormErr:string = "";
  issuedRecordFound = false;
  recordsFound = false;
  dataSource:any;

  sickleaveList=[];

  exceldata=[];

  

  constructor(
    private router:Router, private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog , private ipdService:IpdService,
    private excelService:ExcelService
  ) {
    this.issuedSickleaveSearchForm = new FormGroup({
      patientAdvSearchCtrl : new FormControl('') ,
      searchFromDateCtrl : new FormControl(new Date().toISOString()),
      searchToDateCtrl : new FormControl(new Date().toISOString())
     
    });
   }


   private _filterAdvancePatient(value: string): PatientInfo[] {
    const filterValue = value.toLowerCase();
    return this.patientinfo.filter(patient => patient.name.toLowerCase().indexOf(filterValue) === 0 ||  patient.code.toLowerCase().indexOf(filterValue) === 0);
  }
  
   private patientcodes: PatientCode[] = [];
   public filteredPatientCode: ReplaySubject<PatientCode[]> = new ReplaySubject<PatientCode[]>(1);


   private aadharnumbers: PatientAadhar[] = [];
   public filteredPatientAadhar: ReplaySubject<PatientAadhar[]> = new ReplaySubject<PatientAadhar[]>(1);

   public filteredPatientName: ReplaySubject<PatientAadhar[]> = new ReplaySubject<PatientAadhar[]>(1);

   private _onDestroy = new Subject<void>();
  ngOnInit() {
    this.getPatientCode('E');
  }

  getPatientListBySearch(event) {
    if(event.key == "ArrowDown" || event.key == "ArrowUp"){}
    else{
      this.getPatientCode(event.target.value);
    }
  }

  getPatientCode(code){
    this.patientcodes = [];
    this.patientinfo = [];
    this.aadharnumbers = [];
    let dataval;
    let patientlist;
    this.patientService.filterSickLeaveRegisterPatientByCode(code).then(data => {
      dataval = data;
      patientlist = dataval.patient;
      var count = Object.keys(dataval.patient).length;
               let resultObj;
              // let aadharObj;
               for(let i = 0; i<count; i++){

                resultObj = {
                    'code':dataval.patient[i].patient_code,
                    'id': dataval.patient[i].patient_id,
                    'name' : dataval.patient[i].patient_name
                }

                
                /*
                aadharObj = {
                  'aadhar':dataval.patient[i].adhar,
                  'id': dataval.patient[i].patient_id,
                  'name': dataval.patient[i].patient_name
                }
                */
                this.patientcodes.push(resultObj);
                this.patientinfo.push(resultObj);
              //  this.aadharnumbers.push(aadharObj);
            }

            this.filteredPatients = this.issuedSickleaveSearchForm.get("patientAdvSearchCtrl").valueChanges
            .pipe(
              startWith(''),
              map(patientinfo => patientinfo ? this._filterAdvancePatient(patientinfo) : this.patientinfo.slice())
            );
           
          this.filteredPatientCode.next(this.patientcodes.slice());
     
           console.log(this.patientinfo);  
    },
    error => {
     console.log("There is some error in Pcode List...");
   });
  }

  displayedColumns: string[] = ['slno','applydate','approvedate', 'patientID', 'name', 'challanno', 'division','lineno','noofdays'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  onSubmit() {
    this.sickleaveList = [];
    let dataval;
    let list;
  console.log(this.issuedSickleaveSearchForm.value);
    this.commonService.getIssuedSickApprovalByDate(this.issuedSickleaveSearchForm.value).then(data => {
      dataval = data;
      
      list = dataval.result;
      this.sickleaveList.push(list);
      console.log(this.sickleaveList[0]);
      this.exceldata=this.sickleaveList[0];
      const tcount = this.sickleaveList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.sickleaveList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
      this.issuedRecordFound =true;
     
    } ,
    error => {
     console.log("error in todays investigation list");
   });

  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.exceldata, 'sickleave');
 }

 displayFn(id) {
  if (!id) return '';
  let index = this.patientinfo.findIndex(patient => patient.id === id);
  return this.patientinfo[index].name + " ( " + this.patientinfo[index].code + " ) ";
}

}// end of class
