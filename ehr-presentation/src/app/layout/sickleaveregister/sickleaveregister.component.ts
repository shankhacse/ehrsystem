import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild , ViewEncapsulation } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommonService } from '../../service/common.service';
import { SymptomdiseaseService } from '../../service/symptomdisease.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatashareService } from '../../service/datashare.service';
import { PatientService } from '../../service/patient.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { IpdService } from '../../service/ipd.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ExcelService } from '../../service/excel.service';



@Component({
  selector: 'app-sickleaveregister',
  templateUrl: './sickleaveregister.component.html',
  styleUrls: ['./sickleaveregister.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SickleaveregisterComponent implements OnInit {

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
     
      searchFromDateCtrl : new FormControl(new Date().toISOString()),
      searchToDateCtrl : new FormControl(new Date().toISOString())
     
    });
   }

  ngOnInit() {
  }

  displayedColumns: string[] = ['slno','applydate','approvedate', 'patientID', 'name', 'challanno', 'division','lineno','noofdays'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  onSubmit() {
    this.sickleaveList = [];
    let dataval;
    let list;

    this.commonService.getIssuedSickApprovalByDate(this.issuedSickleaveSearchForm.value).then(data => {
      dataval = data;
      
      list = dataval.result;
      this.sickleaveList.push(list);
      console.log(this.sickleaveList[0]);
    //  this.exceldata=this.sickleaveList[0];
      const tcount = this.sickleaveList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.sickleaveList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
     // this.exceldata=this.dataSource;
      this.issuedRecordFound =true;
     
    } ,
    error => {
     console.log("error in todays investigation list");
   });

  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.exceldata, 'sickleave');
 }

}// end of class
