import { Component, OnInit ,ViewChild} from '@angular/core';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { PatientService } from '../../service/patient.service';
import { GlobalconstantService } from '../../service/globalconstant.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';





export interface Patient {
 
  name: string;
  emplcode: string;
} 

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Mithilesh Routh', weight: 1236547891, symbol: 'Permanent'},
  {position: 2, name: 'Aayush Kumar', weight: 3214587965, symbol: 'Dependent'},
  
];

export class PatientsCls {
  public patient_name: string;
  public patient_code: string;
}

@Component({
  selector: 'app-patientreg',
  templateUrl: './patientreg.component.html',
  styleUrls: ['./patientreg.component.css']
})


export class PatientregComponent implements OnInit {

  patientRegForm: FormGroup;
  registerButtonActive:boolean = true;
  loaderActive:boolean = false;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  isCheked = false;
  enableAdvancesearch = false;

  private  patientlst:  Array<object> = [];

  // patient detail info initilization

  patientName:string = "";
  patientGender:string = "";
  patientDOB:Date;
  patientBloodGrp:string = "";
  patientType:string = "";
  patientRelation:string = "";
  patientLineNo:string = "";
  patientDivisionNo:string = "";
  patientChallanNo:string = "";
  patientEstate:string = "";
  



  constructor(private patientService:PatientService,private _global:GlobalconstantService,public dialog: MatDialog) {
    /*
    this.filteredStates = this.patientCtrl.valueChanges
      .pipe(
        startWith(''),
        map(patient => patient ? this._filterStates(patient) : this.patients.slice())
      );
      */

     this.patientRegForm = new FormGroup({
          searchpatientCtrl: new FormControl(''),
          hdnPatientID: new FormControl(''),
          regdate: new FormControl(''),
          patienname : new FormControl(''),
          patientmobileno: new FormControl(''),
          patientid: new FormControl(''),
          patientName: new FormControl(''),
          patientGender: new FormControl(''),
          patientDOB: new FormControl(''),
          patientBloodGrp: new FormControl(''),
          patientType: new FormControl(''),
          patientRelation: new FormControl(''),
          patientLineNo: new FormControl(''),
          patientDivisionNo: new FormControl(''),
          patientChallanNo: new FormControl(''),
          patientEstate: new FormControl('')
     });

   }
  

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  patientCtrl = new FormControl();

  /*
  filteredStates: Observable<Patient[]>;

  patients: Patient[] = [
    {
      name: 'Mithilesh Routh',
      emplcode: 'E0001',
     
    
    },
    {
      name: 'Abhik Ghosh',
      emplcode: 'E0001/SO',
    
    },
    {
      name: 'Shibu Sankar',
      emplcode: 'E0002',
     
    
    },
    {
      name: 'Suman Mukherjee ',
      emplcode: 'E0003',
     
    }
  ];
*/
  listofPatient = [];
 
   patientLst: string[];
   selected = null;
/*
   private _filterStates(value: string): Patient[] {
    const filterValue = value.toLowerCase();

    return this.patients.filter(patient => patient.name.toLowerCase().indexOf(filterValue) === 0);
  }
*/


 
  enableAdvanceSearch(event) {

    this.isCheked = !this.isCheked;

    if(this.isCheked==true){
      this.enableAdvancesearch = true;
    }
    else{
      this.enableAdvancesearch = false;
    }

  

}




  ngOnInit() {
    this.getPatientLists();
    this.getContacts();
   // let token = this.getDecodedAccessToken(localStorage.getItem("token"));
  //  console.log(token.data.user_name); // show decoded token object in console
  }
  public  getContacts(){
    let patient;
    this.patientService.GetPatientListAll().subscribe((data:  Array<object>) => {
        patient =  data;
        this.patientlst.push(data);
        console.log(data);
    });
  }


  getPatientLists(){
    let dataval;
    let patiendata;
    this.patientService.getPatientList().then(data => {
      dataval = data;
      patiendata = dataval.patient;
      this.listofPatient.push(patiendata);
    },
    error => {
     console.log("There is some error in Patient list...");
   });
  }


  getPatientDetail(patient){
    this.patientRegForm.patchValue({
      hdnPatientID: patient.patient_id,
      patientName: patient.patient_name,
      patientGender: patient.gender,
     // patientDOB: new FormControl(''),
      patientBloodGrp: patient.blood_group,
      patientType: patient.patient_type,
     // patientRelation: new FormControl(''),
      patientLineNo: patient.line_number,
      patientDivisionNo: patient.division_number,
      patientChallanNo: patient.challan_number,
      patientEstate: patient.Estate
    });

  }

  getDecodedAccessToken(token: string): any {
    try{
      //  return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  onSubmit(){

    this.registerButtonActive = false;
    this.loaderActive = true;

    let response;
    console.log(this.patientRegForm.value);
    this.patientService.registerPatient(this.patientRegForm.value).then(data => {
      response = data;
      if(response.msg_status==200){
        
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




