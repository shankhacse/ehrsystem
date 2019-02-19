import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';
import { AfterViewInit,  OnDestroy,  ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig} from '@angular/material';
import { GlobalconstantService } from '../../../service/globalconstant.service';
import { DismisswithpromptdialogComponent } from '../dismisswithpromptdialog/dismisswithpromptdialog.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface DialogData {
  animal: string;
  name: string;
}



interface AssociatedEmpl {
  id: string,
  code: string,
  name: string
}

export interface PatientInfo{
  id: string,
  code: string,
  name : string,
  lineno : any,
  challan: any,
  house:any
}

@Component({
  selector: 'app-patientadddialog',
  templateUrl: './patientadddialog.component.html',
  styleUrls: ['./patientadddialog.component.css']
})


export class PatientadddialogComponent implements OnInit , OnDestroy {
  version = VERSION;
  bloodGroupList = [];
  patientTypeList = [];
  relationsList = [];
  estateList = [];
  divisionList = [];
  lineList = [];
  challanList = [];
  patientAddForm: FormGroup;
  registerButtonActive = true;
  loaderActive = false;
  issubmitted = false;
  maxDate:Date = new Date();

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  filteredPatients: Observable<PatientInfo[]>;
  patientinfo:PatientInfo[] = [];
  
  constructor(public dialogRef: MatDialogRef<PatientadddialogComponent> , private commonService:CommonService,private patientService:PatientService ,  @Inject(MAT_DIALOG_DATA) public data: "d" , private _global:GlobalconstantService ,public dialog: MatDialog) { 

    this.patientAddForm = new FormGroup({
     /* pcodeCtrl: new FormControl(''), */
      pnameCtrl: new FormControl('' , Validators.required ),
    /*  dobCtrl: new FormControl('' , Validators.required), */
      dobCtrl: new FormControl('', Validators.required),
      gender : new FormControl('' , Validators.required),
      mobileCtrl: new FormControl(''),
      alternatemblCtrl: new FormControl(''),
      aadharCtrl: new FormControl(''),
      bldgrpCtrl: new FormControl(''),
      patienttypeCtrl: new FormControl('' , Validators.required),
    /*  associateEmplCtrl: new FormControl('' , Validators.required), */
      patientAdvSearchCtrl : new FormControl(''),
      associateEmplCtrl: new FormControl(''),
      associateEmplFilterCtrl: new FormControl(''),
    /*  relationCtrl: new FormControl('' , Validators.required), */
      relationCtrl: new FormControl(''),
      linenoCtrl: new FormControl(''),
      divisionCtrl: new FormControl(''),
      challannoCtrl: new FormControl(''),
      estateCtrl: new FormControl('', Validators.required),
     // estateCtrl: new FormControl('') ,
      reasonCtrl: new FormControl('') ,
     
 });

  }


    //public associateEmplCtrl: FormControl = new FormControl();
    //public associateEmplFilterCtrl: FormControl = new FormControl();
    private associatedEmplList: AssociatedEmpl[] = [];
    public filteredAssociatedEmpl: ReplaySubject<AssociatedEmpl[]> = new ReplaySubject<AssociatedEmpl[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;
    /** Subject that emits when the component has been destroyed. */
    private _onDestroy = new Subject<void>();


  get f() { return this.patientAddForm.controls; }

  private _filterAdvancePatient(value: string): PatientInfo[] {
    const filterValue = value.toLowerCase();
    return this.patientinfo.filter(patient => patient.name.toLowerCase().indexOf(filterValue) === 0 ||  patient.code.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(id) {
    if (!id) return '';
    let index = this.patientinfo.findIndex(patient => patient.id === id);
    let pcode = "";
    if(this.patientinfo[index].code!=null){
      pcode = " ( " + this.patientinfo[index].code + " )";
    }
    return this.patientinfo[index].name + pcode;
  }

  ngOnInit() {
    this.getPatientCode('E');
    this.getBloodGroup();
    this.getRelationsByType('N/W');
    this.getEstates();
    this.getPatientType();
    this.getDivision();
    this.getLineMaster();
    this.getChallanMaster();
   
  }

  getDivision(){
    let dataval;
    let divisionlist;
    this.commonService.getDivision().then(data => {
      dataval = data;
      divisionlist = dataval.result;
      this.divisionList.push(divisionlist);
    },
    error => {
     console.log("There is some error in division List...");
   });
  }

  getLineMaster(){
    let dataval;
    let linelist;
    this.commonService.getLineMaster().then(data => {
      dataval = data;
      linelist = dataval.result;
      this.lineList.push(linelist);
    },
    error => {
     console.log("There is some error in LineList ...");
   });
  }

  getChallanMaster(){
    let dataval;
    let challanlist;
    this.commonService.getChallanMaster().then(data => {
      dataval = data;
      challanlist = dataval.result;
      this.challanList.push(challanlist);
    },
    error => {
     console.log("There is some error in challanList ...");
   });
  }


  getPatientListBySearch(event) {
    if(event.key == "ArrowDown" || event.key == "ArrowUp"){}
    else{
      this.getPatientCode(event.target.value);
    }
  }

  getPatientCode(code) {
    this.associatedEmplList = [];
    this.patientinfo = [];
    let dataval;
    let patientlist;
    this.patientService.associatedEmplByCode(code).then(data => {
      dataval = data;
      patientlist = dataval.patient;
      var count = Object.keys(dataval.patient).length;
               let resultObj;
               let resultObj1;
              for(let i = 0; i<count; i++){

                resultObj = {
                    'id': dataval.patient[i].patient_id,
                    'code':dataval.patient[i].patient_code,
                    'name':dataval.patient[i].patient_name
                    
                }
                this.associatedEmplList.push(resultObj);



                resultObj1 = {
                  'code':dataval.patient[i].patient_code,
                  'id': dataval.patient[i].patient_id,
                  'name' : dataval.patient[i].patient_name,
                  'lineno' : dataval.patient[i].line_number,
                  'challan' : dataval.patient[i].challan_number,
                  'house' : dataval.patient[i].house_no
              }
              this.patientinfo.push(resultObj1);
              this.filteredPatients = this.patientAddForm.get("patientAdvSearchCtrl").valueChanges
              .pipe(
                startWith(''),
                map(patientinfo => patientinfo ? this._filterAdvancePatient(patientinfo) : this.patientinfo.slice())
              );


            }
           
          this.filteredAssociatedEmpl.next(this.associatedEmplList.slice());
          /*
          this.patientAddForm.get('associateEmplFilterCtrl').valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterAssociateEmployee();
          });
          */
      },
    error => {
     console.log("There is some error in Pcode List...");
   });
  }

 

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  patientTypeChange(event) {
    //console.log(event.value.alias_code);
    this.getRelationsByType(event.value.alias_code);
  }

  getEstateByEmpl(event) {
    console.log("Event");
    console.log(event);
  
    let dataval;
    let estatelist;
    this.commonService.getEstateByEmpl(event.value.code).then(data => {
      dataval = data;
      estatelist = dataval.result;
      /*this.estateList.push(estatelist);*/

     

      this.patientAddForm.patchValue({
        estateCtrl: estatelist[0].code
      });

      //this.patientAddForm.controls['estateCtrl'].disable(); 

    },
    error => {
     console.log("There is some error in Estate List...");
    });



  }


   



  private filterAssociateEmployee() {
    if (!this.associatedEmplList) {
      return;
    }
    
    let search = this.patientAddForm.get('associateEmplFilterCtrl').value;
    if (!search) {
      this.filteredAssociatedEmpl.next(this.associatedEmplList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    
    this.filteredAssociatedEmpl.next(
      this.associatedEmplList.filter(associatedEmplList => associatedEmplList.code.toLowerCase().indexOf(search) > -1)
    );

  }

  onNoClick(): void {
    let data = {
      "from":"Close"
    }
    this.openConfirmationDialog();
    //this.dialogRef.close();
  }

  getBloodGroup(){
    let dataval;
    let bldgrouplist;
    this.commonService.getBloodGroup().then(data => {
      dataval = data;
      bldgrouplist = dataval.result;
      this.bloodGroupList.push(bldgrouplist);
    },
    error => {
     console.log("There is some error in Blood Group List...");
   });
  }

  getPatientType(){
    let dataval;
    let patienttypelist;
    this.commonService.getDepEmployeeType().then(data => {
      dataval = data;
      patienttypelist = dataval.result;
      this.patientTypeList.push(patienttypelist);
    },
    error => {
     console.log("There is some error in Estate List...");
   });
  }

  getRelationsByType(type){
   
    let dataval;
    let relationlist;
    this.commonService.getRelationsByType(type).then(data => {
      this.relationsList = [];
      dataval = data;
      relationlist = dataval.result;
      this.relationsList.push(relationlist);
    },
    error => {
     console.log("There is some error in Relation List...");
   });
  }

  getEstates(){
    let dataval;
    let estatelist;
    this.commonService.getEstates().then(data => {
      dataval = data;
      estatelist = dataval.result;
      this.estateList.push(estatelist);
    },
    error => {
     console.log("There is some error in Estate List...");
   });
  }

/*
  enableAssociate(isrequred){
    if(isrequred == 1){
      this.patientAddForm.controls['associateCtrl'].enable(); 
    }
    else{
      this.patientAddForm.controls['associateCtrl'].disable(); 

      this.patientAddForm.patchValue({
        hdnPatientID: null
      });
  

    }
  }
*/

  onSubmit(){
    this.issubmitted = true;
    console.log("Form Value "+this.patientAddForm.value);
    console.log(this.patientAddForm.value);
    console.log(this.patientAddForm.invalid);
    if(this.patientAddForm.invalid) {
      console.log("Validation Required");
    }
    else{
     // this.patientAddForm.controls['estateCtrl'].enable(); 
      this.registerButtonActive = false;
      this.loaderActive = true;
      let response;
      this.patientService.addNewPatient(this.patientAddForm.value).then(data => {
        response = data;
        if(response.msg_status==200){
          let data = {
           "from" : "Save",
           "patientcode" : response.pcode, 
           "patientname" : this.patientAddForm.get("pnameCtrl").value,
           "dob" : new Date(this.patientAddForm.get("dobCtrl").value).toLocaleDateString(),
           "gender" : this.patientAddForm.get("gender").value,
           "division" : this.patientAddForm.get("divisionCtrl").value,
           "challan" : this.patientAddForm.get("challannoCtrl").value,
           "line" : this.patientAddForm.get("linenoCtrl").value,
           "mobile" : this.patientAddForm.get("mobileCtrl").value,
           "aadhar" : this.patientAddForm.get("aadharCtrl").value
          }
          this.dialogRef.close(data);
  
        }
        else{
          this.registerButtonActive = true;
          this.loaderActive = false;
        }
       },
         error => {
           console.log("There is some error on submitting...");
       });
    }

}



openConfirmationDialog() {
  const dialogRef = this.dialog.open(DismisswithpromptdialogComponent, {
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
     
  });
}


  

}
