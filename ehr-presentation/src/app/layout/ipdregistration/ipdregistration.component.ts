import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild , ViewEncapsulation } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommonService } from './../../service/common.service';
import { SymptomdiseaseService } from './../../service/symptomdisease.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatashareService } from './../../service/datashare.service';
import { PatientService } from './../../service/patient.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../components/successdialog/successdialog.component';
import { IpdService } from './../../service/ipd.service';
import { MasterentrydialogComponent } from '../components/masterentrydialog/masterentrydialog.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';





interface Medicine {
  id: string,
  name: string,
  type: string
}

interface Dosage {
  id: string,
  value: string,
}

interface Frequency {
  id: string,
  frequency: string,
}

interface Relation {
  id: string;
  name: string;
}

interface Instruction{
  id: string;
  name: string;
}

interface Reports{
  id: string;
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
  selector: 'app-ipdregistration',
  templateUrl: './ipdregistration.component.html',
  styleUrls: ['./ipdregistration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IpdregistrationComponent implements OnInit {
  disableClick;
  ipdRegistrationForm : FormGroup;
  patientList = []; 
  relationsList = []; 
  bloodGroupList = [];
  addedMeddata = [];
  addedInvestigations = [];

  
  medicineError:string = "";
  testReportError:string = "";
  validFormErr:string = "";
  patientSelf:string = "";

  filteredPatients: Observable<PatientInfo[]>;
  patientinfo:PatientInfo[] = [];

  constructor(private router:Router, private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog , private ipdService:IpdService,public snackBar: MatSnackBar) { 
    
    this.ipdRegistrationForm = new FormGroup({
      admissionDtCtrl: new FormControl(new Date().toISOString(),Validators.required),
      roomNoCtrl: new FormControl(''),
      bedNoCtrl: new FormControl(''),
     /* employeeCode: new FormControl(''),
      emplCodeFilterCtrl: new FormControl(''),  
      relationCtrl: new FormControl(''),  
      symptomsMultiCtrl: new FormControl(''),
      choosePatientCtrl: new FormControl(''), */ 
      genderCtrl : new FormControl('', Validators.required),
      patientTypeCtrl : new FormControl('', Validators.required),
      ageCtrl : new FormControl('', Validators.required),
      bldgrpCtrl: new FormControl(''),
      patientAdvSearchCtrl : new FormControl('', Validators.required),
      patinetNameCtrl: new FormControl('', Validators.required),
      bpSystolicCtrl: new FormControl(''),
      bpDiastolicCtrl: new FormControl(''),
      haemoglobinCtrl: new FormControl(''),
      bldsugarFCtrl: new FormControl(''),
      bldsugarPPCtrl: new FormControl(''),
      bldsugarRCtrl: new FormControl(''),
      jaundiceCtrl: new FormControl(''),
      tempCtrl: new FormControl(''),
      heightCtrl: new FormControl(''),
      weightCtrl: new FormControl(''), 
      odemaCtrl: new FormControl(''), 
      
      medicineCtrl: new FormControl(''),
      medicineFilterCtrl: new FormControl(''),
      dosageCtrl: new FormControl(''),
      dosageFilterCtrl: new FormControl(''),
      instructionCtrl: new FormControl(''),
      instructionFilterCtrl: new FormControl(''),
      investigationDt: new FormControl(new Date().toISOString()),
      reportsCtrl: new FormControl(''),
      reportsFilterCtrl: new FormControl(''),
      daysCtrl: new FormControl(''),
      generalExaminationCtrl : new FormControl(''),
      systemicExaminationCtrl : new FormControl(''),
      provisionalExaminationCtrl : new FormControl(''),
      finalDiagnosisCtrl : new FormControl(''),
     
    });

  }

  version = VERSION;

  private relations: Relation[] = [];
  private medicines: Medicine[] = [];
  private dosages: Dosage[] = [];
  private frequency: Frequency[] = [];
  private instructions: Instruction[] = [];
  private medreports: Reports[] = [];
  
  public filteredMedicines: ReplaySubject<Medicine[]> = new ReplaySubject<Medicine[]>(1);
  public filteredDosages: ReplaySubject<Dosage[]> = new ReplaySubject<Dosage[]>(1);
  public filteredFrequency: ReplaySubject<Frequency[]> = new ReplaySubject<Frequency[]>(1);

  public filterRelations: ReplaySubject<Relation[]> = new ReplaySubject<Relation[]>(1);
  public filteredRelationsMulti: ReplaySubject<Relation[]> = new ReplaySubject<Relation[]>(1);

  public filteredInstruction: ReplaySubject<Frequency[]> = new ReplaySubject<Frequency[]>(1);
  public filteredReports: ReplaySubject<Reports[]> = new ReplaySubject<Reports[]>(1);


  private associatedEmplList: AssociatedEmpl[] = [];
  public filteredAssociatedEmpl: ReplaySubject<AssociatedEmpl[]> = new ReplaySubject<AssociatedEmpl[]>(1);
  
  @ViewChild('singleSelect') singleSelect: MatSelect; 

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  ngOnInit() {

    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }

    
    this.getPatientCode('E');
    this.getRelations();
    this.getBloodGroup();

    this.getMedicine('A');


    // Investigation Dropdown Population
    this.getIvestigations();
    this.filteredReports.next(this.medreports.slice());
    this.ipdRegistrationForm.get('reportsFilterCtrl').valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMedReports();
    });



  }



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



  getPatientListBySearch(event) {
    if(event.key == "ArrowDown" || event.key == "ArrowUp"){}
    else{
      this.getPatientCode(event.target.value);
    }
  }

  getMedicineBySerach(event) {
    if(event.key == "ArrowDown" || event.key == "ArrowUp"){}
    else{
      this.getMedicine(event.target.value);
    }
  }

  getOtherDependent(obj){
    this.medicineError = "";
    this.getDosage(obj);
    this.getFrequency(obj);
  }

  addMedicine() {
    this.medicineError = "";
    //let date = this.presciptionForm.get('date').value;
    let medicine = this.ipdRegistrationForm.get('medicineCtrl').value;
    let dosage = this.ipdRegistrationForm.get('dosageCtrl').value;
    let frequency = this.ipdRegistrationForm.get('instructionCtrl').value;
    let days = this.ipdRegistrationForm.get('daysCtrl').value;
    
    if(medicine == ""){
      this.medicineError = "Error : Select Medicine";
    }
    else{
      //let data = {datetd: date, medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
      let data = {medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
      this.addedMeddata.push(data);
  
      this.ipdRegistrationForm.patchValue({
        medicineCtrl:'',
        dosageCtrl:'',
        instructionCtrl:'',
        daysCtrl:''
      });
  
    }
  }

  removeData(i){
    this.addedMeddata.splice(i, 1);
  }


  addInvestigation(){
    this.testReportError = "";
    let date = this.ipdRegistrationForm.get('investigationDt').value;
    let report = this.ipdRegistrationForm.get('reportsCtrl').value;

    if(report==""){
      this.testReportError = "Error : Select at least one test";
    }
    else{
      let data = {invdate: date, reports:report, action: 'x' };
      this.addedInvestigations.push(data);

      this.ipdRegistrationForm.patchValue({
        reportsCtrl:''
      });

    }
  }

  removeMedReports(i){
    this.addedInvestigations.splice(i, 1);
  }

  clearTestError(obj){
    this.testReportError = "";
  }



  getChoosePatient(event) {
       // console.log(event.value.code);
      let empcode = event.value.code;
      let relation = this.ipdRegistrationForm.get('relationCtrl').value;
      this.getChoosePatientList(empcode,relation);



  }

  getChoosePatientByRel(event) {
    // console.log(event.value.code);
  
   let relation = event.value;
   let empcode = this.ipdRegistrationForm.get('employeeCode').value;
   console.log(empcode.code);
   this.getChoosePatientList(empcode.code,relation);



}

  selectPatient(event) {
   // console.log(event);

    if(event.value.blood_group == "" || event.value.blood_group == null) {
      this.ipdRegistrationForm.controls['bldgrpCtrl'].enable();
    }
    else {
      this.ipdRegistrationForm.controls['bldgrpCtrl'].disable();
    }

    this.ipdRegistrationForm.patchValue({
      patinetNameCtrl : event.value.patient_name ,
      bldgrpCtrl : event.value.blood_group 
    });
  }

  getChoosePatientList(empcode,relation) {

    this.ipdRegistrationForm.patchValue({
      patinetNameCtrl : null ,
      bldgrpCtrl : null 
    });

    let dataval;
    let patientlist;
    this.patientService.getPatientForIPD(empcode,relation).then(data => {
      this.patientList = [];
      dataval = data;
      patientlist = dataval.result;
      this.patientList.push(patientlist);
    },
    error => {
     console.log("There is some error in Patient List...");
   });
  }


 

  getDosage(obj){
    let dataval;
    let dosagelist;
    this.dosages = [];
    this.symptomdiseaseService.getDosageByMedicine(obj.value).then(data => {
      dataval = data;
      dosagelist = dataval.result;
      var count = Object.keys(dataval.result).length;
               let resultObj;
               for(let i = 0; i<count; i++){
                resultObj = {
                    'id': dataval.result[i].dosage_id	,
                    'value' : dataval.result[i].value
                }
                this.dosages.push(resultObj);
            }
           
    this.filteredDosages.next(this.dosages.slice());
    this.ipdRegistrationForm.get('dosageFilterCtrl').valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDosage();
      });

             
    },
    error => {
     console.log("There is some error in Dosage List...");
   });
  }


  getFrequency(obj){
    let dataval;
    let frequencylist;
    this.frequency = [];
    this.symptomdiseaseService.getFrequencyByMedicine(obj.value).then(data => {
      dataval = data;
      frequencylist = dataval.result;
      var count = Object.keys(dataval.result).length;
               let resultObj;
               for(let i = 0; i<count; i++){
                resultObj = {
                    'id': dataval.result[i].frequency_master_id	,
                    'frequency' : dataval.result[i].frequency
                }
                this.frequency.push(resultObj);
            }
           
            this.filteredInstruction.next(this.frequency.slice());
            this.ipdRegistrationForm.get('instructionFilterCtrl').valueChanges
              .pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterInstruction();
              });
             
    },
    error => {
     console.log("There is some error in Frequency List...");
   });
  }

  getRelations() {
   
    let dataval;
    let relationlist;
    this.commonService.getRelations().then(data => {
      this.relationsList = [];
      dataval = data;
      relationlist = dataval.result;
      this.relationsList.push(relationlist);
    },
    error => {
     console.log("There is some error in Relation List...");
   });
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

  getIvestigations(){
    let dataval;
    let reportlist;
    this.symptomdiseaseService.getInvestigations().then(data => {
      dataval = data;
      reportlist = dataval.result;
      var count = Object.keys(dataval.result).length;
               let resultObj;
               for(let i = 0; i<count; i++){
                resultObj = {
                    'name':dataval.result[i].investigation_name,
                    'id': dataval.result[i].investigation_id
                }
                this.medreports.push(resultObj);
            }
            this.filteredReports.next(this.medreports.slice());

             
    },
    error => {
     console.log("There is some error in Investigation List...");
   });
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

                /*
                resultObj = {
                    'id': dataval.patient[i].patient_id,
                    'code':dataval.patient[i].patient_code,
                    'name':dataval.patient[i].patient_name
                    
                }
                this.associatedEmplList.push(resultObj);
                */


                resultObj1 = {
                  'code':dataval.patient[i].patient_code,
                  'id': dataval.patient[i].patient_id,
                  'name' : dataval.patient[i].patient_name,
                  'lineno' : dataval.patient[i].line_number,
                  'challan' : dataval.patient[i].challan_number,
                  'house' : dataval.patient[i].house_no
              }
              this.patientinfo.push(resultObj1);
              this.filteredPatients = this.ipdRegistrationForm.get("patientAdvSearchCtrl").valueChanges
              .pipe(
                startWith(''),
                map(patientinfo => patientinfo ? this._filterAdvancePatient(patientinfo) : this.patientinfo.slice())
              );


            }
           
            /*
          this.filteredAssociatedEmpl.next(this.associatedEmplList.slice());
         
          this.ipdRegistrationForm.get('emplCodeFilterCtrl').valueChanges
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



  onSubmit(formdata) {
    console.log(formdata);

      //this.sendPhrmcyBtnActive = false;
     
      if(this.validateOnRegType()){
        let response;
        this.ipdService.insertIntoIPD(formdata,this.addedMeddata,this.addedInvestigations).then(data => {
          response = data;
          if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
            this.openDialog();
            this.ipdRegistrationForm.reset();
            this.addedMeddata = [];
            this.addedInvestigations = [];
          }
          else{
            this.openDialogError();
          }
          console.log(response);
        },
        error => {
            console.log("There is some error on submitting...");
        });


      }//end of validation
  

  }

  openDialog() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'IPD Done Successfully',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/ipdlist'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  openDialogError() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'There is some problem.Try again ...',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/ipd'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  // Investigation
  openInvestigationEntryDialog() {
      
    
     
     
    let fields = [
      {
        "ctrlname" : "investigationNameCtrl",
        "inputtyep" : "text",
        "placeholder" : "Test Name *"
      }
      
    ];

    let formCtrlInilize = {
      investigationNameCtrl : new FormControl('',Validators.required)
      
    }

    const dialogRef = this.dialog.open(MasterentrydialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        fielddatas : fields,
        initializeField:formCtrlInilize,
        iconcolor: '#1d8c3d',
        tbl : 'investigation',
        datafrom : 'INVESTIGATION', // don't change this value
        heading:'Add Test'
       }
    });
  
    dialogRef.afterClosed().subscribe(result => {
        //this.getDiseaseList(this.presciptionForm.get("symptomsMultiCtrl").value);
        if(result.from=="Save") {
          this.openSnackBar("Test Added successfully");
          this.getIvestigations();
        }
    });

  }

  openSnackBar(msg) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this.snackBar.open(msg, "", config);
   
  }


  backToIpdList() {
    this.router.navigateByUrl('panel/ipdlist');
  }
  /*
  * --------------------------------------------------------------------------------------------------------
  * ----------------------------------------MEDICINE RELATED CALLS------------------------------------------
  * --------------------------------------------------------------------------------------------------------
  *
  **/

 getMedicine(medname){
  let dataval;
  let medicinelist;
  this.medicines = [];
  this.symptomdiseaseService.getMedicineListByName(medname).then(data => {
    dataval = data;
    medicinelist = dataval.result;
    var count = Object.keys(dataval.result).length;
             let resultObj;
             for(let i = 0; i<count; i++){
              resultObj = {
                  'name':dataval.result[i].medicine_name,
                  'id': dataval.result[i].medicine_id	,
                  'type' : dataval.result[i].medicine_type
              }
              this.medicines.push(resultObj);
          }
         
  this.filteredMedicines.next(this.medicines.slice());
  this.ipdRegistrationForm.get('medicineFilterCtrl').valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterMedicines();
    });

           
  },
  error => {
   console.log("There is some error in Medicine List...");
 });
}







  private filterAssociateEmployee() {
    if (!this.associatedEmplList) {
      return;
    }
    let search = this.ipdRegistrationForm.get('emplCodeFilterCtrl').value;
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

  private filterMedReports() {
    if (!this.medreports) {
      return;
    }
    // get the search keyword
    let search =  this.ipdRegistrationForm.get('reportsFilterCtrl').value;
    if (!search) {
      this.filteredReports.next(this.medreports.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredReports.next(
    //  this.medreports.filter(medreport => medreport.name.toLowerCase().indexOf(search) > -1) // commented on 06.03.2019
      this.medreports.filter(medreport => medreport.name.toLowerCase().startsWith(search))
    );
  }


  private filterMedicines() {
    if (!this.medicines) {
      return;
    }
    // get the search keyword
    let search =  this.ipdRegistrationForm.get('medicineFilterCtrl').value;
    if (!search) {
      this.filteredMedicines.next(this.medicines.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMedicines.next(
    //  this.medicines.filter(medicine => medicine.name.toLowerCase().indexOf(search) > -1) // commented on 06.03.2019
      this.medicines.filter(medicine => medicine.name.toLowerCase().startsWith(search))
    );
  }

  private filterDosage() {
    if (!this.dosages) {
      return;
    }
    // get the search keyword
    let search =  this.ipdRegistrationForm.get('dosageFilterCtrl').value;
    if (!search) {
      this.filteredDosages.next(this.dosages.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDosages.next(
      this.dosages.filter(dosages => dosages.value.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterInstruction() {
    if (!this.frequency) {
      return;
    }
    // get the search keyword
    let search =  this.ipdRegistrationForm.get('instructionFilterCtrl').value;
    if (!search) {
      this.filteredInstruction.next(this.frequency.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredInstruction.next(
      this.frequency.filter(frequency => frequency.frequency.toLowerCase().indexOf(search) > -1)
    );
  }



  getPatientByType() {
    // console.log(event.value.code);
  
   let patientType = this.ipdRegistrationForm.get('patientTypeCtrl').value;;
  
   console.log(patientType);
   let patientid = this.ipdRegistrationForm.get('patientAdvSearchCtrl').value;

  
   if(patientType=='SELF' && patientid!=''){
    this.getPatientDetails(patientid);
   

   }else{
    this.ipdRegistrationForm.patchValue({
      patinetNameCtrl:''
     
    });

   }
 



}


getPatientDetails(pcode){
  let dataval;
  let bldgrouplist;
  this.patientService.getPatientInfoByPatientID(pcode).then(data => {
    dataval = data;
    console.log(dataval.result.patient_name);
    this.patientSelf=dataval.result.patient_name;
    this.ipdRegistrationForm.patchValue({
      patinetNameCtrl:this.patientSelf
     
    });
    
  },
  error => {
   console.log("There is some error in Patient Details...");
 });
}

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  
  }



/* validation on Registration Type */

validateOnRegType(){
  this.validFormErr = "";
  let validForm = false;

 
  
  if(this.ipdRegistrationForm.get("genderCtrl").value==""){
        this.validFormErr = "Error : Gender is required";
        return validForm = false;
      
  }
  if(this.ipdRegistrationForm.get("ageCtrl").value==""){
    this.validFormErr = "Error : Age is required";
    return validForm = false;
  
  }

  if(this.ipdRegistrationForm.get("patinetNameCtrl").value==""){
    this.validFormErr = "Error : Patient Name is required";
    return validForm = false;
  
  }

  if(this.ipdRegistrationForm.get("patientTypeCtrl").value==""){
    this.validFormErr = "Error : Patient Type is required";
    return validForm = false;
  
  }

  if(this.ipdRegistrationForm.get("patientAdvSearchCtrl").value==""){
    this.validFormErr = "Error : Permament Worker is required";
    return validForm = false;
  
  }







  validForm = true;
 
  return validForm;
}


onChangePatientType(deviceValue) {
  console.log(deviceValue);
}


}// end of class
