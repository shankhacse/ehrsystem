import { Injectable } from '@angular/core';
import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import {Observable} from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../service/common.service';
import { DatashareService } from './../../../service/datashare.service';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../components/successdialog/successdialog.component';
import { MatSelect, VERSION } from '@angular/material';
import { PatientService } from '../../../service/patient.service';
import { GlobalconstantService } from '../../../service/globalconstant.service';
import { Subject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {HttpClientModule,HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ConfirmationdialogComponent } from '../../components/confirmationdialog/confirmationdialog.component';
import { DeleteconfirmationdialogComponent } from '../components/deleteconfirmationdialog/deleteconfirmationdialog.component';







interface PatientCode{
  id: string,
  code: string,
  name : string
}

export interface PatientInfo{
  id: string,
  code: string,
  name : string
}


interface PatientAadhar{
  id: string,
  aadhar: string ,
  name: string
}

interface Test {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-reportsupload',
  templateUrl: './reportsupload.component.html',
  styleUrls: ['./reportsupload.component.css']
})
export class ReportsuploadComponent implements OnInit {

  addReportsuploadForm : FormGroup;
  
  FieldsearchForm: FormGroup;
  patientNameCtrl:string = "";
  reporttypeNameCtrl:string = "";
  testNameCtrl:string = "";
  testsList = []; 
  validFormErr:string = "";

  testNameCtrlval:string = "";
  patientIdCtrlval:string = "";
  prescriptionCtrlval:string = "";

  reportUploadList = [];
  dataSource:any;
  recordsFound = false;

  selectedFile: File[];

  uploadIndex=[1,2,3,4,5];


  fileToUpload: File = null;
  disableClick;


  displayedColumns: string[] = [
    'slno',
    'testdt',
    'testName',
    'fileName',
    'reportuploadid',

  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('singleSelect') singleSelect: MatSelect; 

  filteredPatients: Observable<PatientInfo[]>;
  filteredTests: Observable<Test[]>;

  patientinfo:PatientInfo[] = [];
  testinfo:Test[] = [];

  constructor(
    private router:Router,
    private commonService:CommonService,
    private datashareService:DatashareService ,
    public dialog: MatDialog,
    private zone:NgZone,
    private patientService:PatientService,
    private global:GlobalconstantService,
    private http: HttpClient,
    
  ) {
    this.addReportsuploadForm = new FormGroup({ 
      prescriptionCtrl : new FormControl(''), 
      testNameCtrl : new FormControl(''), 
      patientAdvSearchCtrl : new FormControl('') ,
      testAdvSearchCtrl : new FormControl('') ,
    
    });

   


   }

   private tests: Test[] = [];
   public filtertests: ReplaySubject<Test[]> = new ReplaySubject<Test[]>(1);

   private _filterAdvancePatient(value: string): PatientInfo[] {
    const filterValue = value.toLowerCase();
    return this.patientinfo.filter(patient => patient.name.toLowerCase().indexOf(filterValue) === 0 ||  patient.code.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterAdvanceTest(value: string): Test[] {
    const filterValue = value.toLowerCase();
    return this.testinfo.filter(test => test.name.toLowerCase().indexOf(filterValue) === 0);
  }
  
   private patientcodes: PatientCode[] = [];
   public filteredPatientCode: ReplaySubject<PatientCode[]> = new ReplaySubject<PatientCode[]>(1);


   private aadharnumbers: PatientAadhar[] = [];
   public filteredPatientAadhar: ReplaySubject<PatientAadhar[]> = new ReplaySubject<PatientAadhar[]>(1);

   public filteredPatientName: ReplaySubject<PatientAadhar[]> = new ReplaySubject<PatientAadhar[]>(1);

   private _onDestroy = new Subject<void>();

  ngOnInit() {

      
 
  
  var isReadableCheck = localStorage.getItem('isReadable');
  console.log('isReadable report upload: '+isReadableCheck);
  if(isReadableCheck=='true'){
    this.disableClick = 1;
  }else{
    this.disableClick = 0;
  }


    this.getPatientCode('E');
    this.getTests();
    this.getTestName('A')
    console.log(this.reportUploadList);
    this.recordsFound = true;
    this.dataSource = new MatTableDataSource(this.reportUploadList[0]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  getTests() {
   
    let dataval;
    let testlist;
    this.commonService.getTestList().then(data => {
      this.testsList = [];
      dataval = data;
      testlist = dataval.result;
      this.testsList.push(testlist);
      console.log(this.testsList);
    },
    error => {
     console.log("There is some error in Relation List...");
   });
  }

  getPatientListBySearch(event) {
    if(event.key == "ArrowDown" || event.key == "ArrowUp"){}
    else{
      this.getPatientCode(event.target.value);
    }
  }

  getTestListBySearch(event) {
    if(event.key == "ArrowDown" || event.key == "ArrowUp"){}
    else{
      this.getTestName(event.target.value);
    }
  }

  
  getPatientCode(code){
    this.patientcodes = [];
    this.patientinfo = [];
    this.aadharnumbers = [];
    let dataval;
    let patientlist;
    this.patientService.filterPatientByCode(code).then(data => {
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

            this.filteredPatients = this.addReportsuploadForm.get("patientAdvSearchCtrl").valueChanges
            .pipe(
              startWith(''),
              map(patientinfo => patientinfo ? this._filterAdvancePatient(patientinfo) : this.patientinfo.slice())
            );
           
          this.filteredPatientCode.next(this.patientcodes.slice());
     
             
    },
    error => {
     console.log("There is some error in Pcode List...");
   });
  }

/* Filter test */

getTestName(name){
 
  this.testinfo = [];
  
  let dataval;
  let testlist;
  this.commonService.filterTestByName(name).then(data => {
    dataval = data;
    testlist = dataval.test;
    var count = Object.keys(dataval.test).length;
             let resultObj;
            // let aadharObj;
             for(let i = 0; i<count; i++){

              resultObj = {
                  
                  'id': dataval.test[i].investigation_id,
                  'name' : dataval.test[i].investigation_name
              }

              
              this.testinfo.push(resultObj);
           
          }

          this.filteredTests = this.addReportsuploadForm.get("testAdvSearchCtrl").valueChanges
          .pipe(
            startWith(''),
            map(testinfo => testinfo ? this._filterAdvanceTest(testinfo) : this.testinfo.slice())
          );
         
      
   
           
  },
  error => {
   console.log("There is some error in Pcode List...");
 });
}

  private filterPatientCode() {
    if (!this.patientcodes) {
      return;
    }
    // get the search keyword
    let search =  this.addReportsuploadForm.get('pcodeFilterCtrl').value;
  //  console.log("Search Forrm " + search);
  //  console.log(this.patientcodes)
    if (!search) {
      this.filteredPatientCode.next(this.patientcodes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // filter the banks
    this.filteredPatientCode.next(
      this.patientcodes.filter(patientcd => patientcd.code.toLowerCase().indexOf(search) > -1 || patientcd.name.toLowerCase().indexOf(search) > -1)
   
      //this.patientcodes.filter = Object.assign({}, this.fields)
    );
  }

  displayFn(id) {
    if (!id) return '';
    let index = this.patientinfo.findIndex(patient => patient.id === id);
    return this.patientinfo[index].name + " ( " + this.patientinfo[index].code + " ) ";
  }
  displayTestFn(id) {
    if (!id) return '';
    let index = this.testinfo.findIndex(test => test.id === id);
    return this.testinfo[index].name;
  }


  upload(files: File[]){
 
    
    console.log(this.addReportsuploadForm.controls['prescriptionCtrl'].value);
    
   this.basicUpload(files);
  
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
} 
  onSubmit(event) {
    console.log(event);
    console.log(this.fileToUpload );
  }


  onFileChanged(event) {
    this.selectedFile = <File[]>event.target.files[0];
  console.log(this.selectedFile);

 
 
  }

  basicUpload(files: File[]){
   
    this.testNameCtrlval=this.addReportsuploadForm.controls['testAdvSearchCtrl'].value;
    this.patientIdCtrlval=this.addReportsuploadForm.controls['patientAdvSearchCtrl'].value;
    this.prescriptionCtrlval=this.addReportsuploadForm.controls['prescriptionCtrl'].value;
    console.log(files);

    this.reportUploadList = [];
    let dataval;
    let reportslist;

    if(this.validateForm()){
    var formData = new FormData();
    formData.append('pidlval',this.patientIdCtrlval);
    formData.append('prescrCtrlval',this.prescriptionCtrlval);
    formData.append('testCtrlval',this.testNameCtrlval);
    Array.from(files).forEach(f => formData.append('file', f))
    return new Promise(resolve => {
    this.http.post(this.global.reportUpload_URL,formData,)
      .subscribe(data => {  
        //console.log(data)
       /* dataval = data;
        reportslist = dataval.result;
        this.reportUploadList.push(reportslist);
        console.log(this.reportUploadList);
        const tcount = this.reportUploadList[0].length;
        if(tcount > 0){
          this.recordsFound = true;
          this.dataSource = new MatTableDataSource(this.reportUploadList[0]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        */
  
      
       this.getUploadreportList(this.patientIdCtrlval);
  
      })
    });

  }//end of else


  }



  validateForm(){
    this.validFormErr = "";
    let validForm = false;

    this.testNameCtrlval=this.addReportsuploadForm.controls['testAdvSearchCtrl'].value;
    this.patientIdCtrlval=this.addReportsuploadForm.controls['patientAdvSearchCtrl'].value;
    this.prescriptionCtrlval=this.addReportsuploadForm.controls['prescriptionCtrl'].value;

    if(this.addReportsuploadForm.controls['patientAdvSearchCtrl'].value==''){
      this.validFormErr = "Error : Select Patient";
      return validForm = false;
    
    }

    if(this.addReportsuploadForm.controls['prescriptionCtrl'].value==''){
          this.validFormErr = "Error : Select IPD or OPD";
          return validForm = false;
        
    }

    if(this.addReportsuploadForm.controls['testAdvSearchCtrl'].value==''){
      this.validFormErr = "Error : Select Test";
      return validForm = false;
    
    }

   

  
    validForm = true;
    return validForm;
  }

  openedChange(opened: boolean) {
    console.log(opened ? 'opened' : 'closed');
}

deleteUpload(reportuploadid) {
  this.patientIdCtrlval=this.addReportsuploadForm.controls['patientAdvSearchCtrl'].value;
  
 // this.openConfirmationDialog(reportuploadid)

  // if(confirm("Are you sure to delete ?")) {
  //   console.log("Implement delete functionality here");
  //   console.log(this.patientIdCtrlval);
  //   this.commonService.deleteReportbyId(reportuploadid).then(data => {

  //     this.getUploadreportList(this.patientIdCtrlval);
  //   } ,
  //   error => {
  //    console.log("error in Upload List list");
  //  });


  // }

  this.openConfirmationDialog(reportuploadid)
 
} 

openConfirmationDialog(delid) {
  const dialogRef = this.dialog.open(DeleteconfirmationdialogComponent, {
    width: '350px',
    disableClose: true,
    data:  {
      msg : 'Do you want to delete ?',
      msgicon : 'delete_forever',
      iconcolor: '#696766',
      btnurl : 'panel/reportsupload',
      delid: delid,
      tblidcolumn : 'report_upload_id',
      tblinfo : 'report_upload'
      }
  });

  dialogRef.afterClosed().subscribe(result => {
     // this.todaysregistrationList = [];
     // this.getTodaysRegistration();
      this.reportUploadList = [];

      this.patientIdCtrlval=this.addReportsuploadForm.controls['patientAdvSearchCtrl'].value;

      this.getUploadreportList(this.patientIdCtrlval);
  });
}

getUploadreportList(patientid) {
  this.reportUploadList = [];
  let dataval;
  let reportslist;

  this.commonService.getUploadreportList(patientid).then(data => {
    dataval = data;
    reportslist = dataval.result;
    this.reportUploadList.push(reportslist);
    console.log(this.reportUploadList);
    const tcount = this.reportUploadList[0].length;
    if(tcount > 0){
      this.recordsFound = true;
     
    }
    this.dataSource = new MatTableDataSource(this.reportUploadList[0]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

   
  } ,
  error => {
   console.log("error in todays investigation list");
 });

}

onSelectionChanged(event) {
  console.log("test");
  console.log(event.option.value);
  this.getUploadreportList(event.option.value);
}

}//end of class
