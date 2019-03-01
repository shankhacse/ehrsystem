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
//import { ConfirmationdialogComponent } from '../components/confirmationdialog/confirmationdialog.component';
import { ConfirmationdischargeComponent } from '../components/confirmationdischarge/confirmationdischarge.component';
import { SuccessdialogwithprintComponent } from '../components/successdialogwithprint/successdialogwithprint.component';





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


interface Hospitals{
  id: any;
  name: any;
}

export interface addedMedicineData {
  datetd:any;
  medicinetd:any;
  dosagetd:any;
  unittd:any;
  daystd:any;
  actiontd:any;
}

@Component({
  selector: 'app-ipddischarge',
  templateUrl: './ipddischarge.component.html',
  styleUrls: ['./ipddischarge.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IpddischargeComponent implements OnInit {
  isRemoveEnable =  false;
  displayedColumns: string[] = [ 'datetd' , 'medicinetd' , 'dosagetd' , 'unittd', 'daystd' , 'actiontd'];
  
  dataSource = [];

  displayedColumnsReport: string[] = [ 'datetd' , 'reportdtd', 'actiontd'];

  ipdprescriptObj;
  ipdRowId = "0";

  ipdDischargeForm : FormGroup;
  patientList = []; 
  relationsList = []; 
  bloodGroupList = [];
  addedMeddata = [];
  addedInvestigations = [];

  
  medicineError:string = "";
  testReportError:string = "";
  validFormErr:string = "";
  disableClick;

  //submitBtnText = "";

  constructor(private router:Router, private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog , private ipdService:IpdService) { 
    
    this.ipdDischargeForm = new FormGroup({
     
      ipdRowIDCtrl: new FormControl({value: ''}, Validators.required),
      patientID:new FormControl({value: ''}, Validators.required),
      patientHelathProfileID:new FormControl({value: ''}, Validators.required),
      patientNameCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      dobCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      emplCodeCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      roomNoCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      bedNoCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      bldgrpCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      genderCtrl: new FormControl({value: '', disabled: true}),
      ageCtrl: new FormControl({value: '', disabled: true}),
      patientAdvSearchCtrl: new FormControl({value: '', disabled: true}),
      patinetNameCtrl: new FormControl({value: '', disabled: true}),
      patientTypeCtrl: new FormControl({value: '', disabled: true}),
      bpCtrl: new FormControl(''),
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
      dischargeDt: new FormControl(new Date().toISOString()),
      nextCheckUpDt: new FormControl(''),
      daysCtrl: new FormControl(''),
     
      instructionCommentCtrl : new FormControl(''),
      dischargeCommentCtrl : new FormControl(''),
      finalCommentCtrl : new FormControl(''),
      reffHospitalCtrl : new FormControl('')
      //reffHospitalFilterCtrl : new FormControl(''),


     
      
    });


    this.ipdprescriptObj = this.datashareService.getIPDDischargeRowData();
    console.log("IPD Discharge");
    console.log(this.ipdprescriptObj);
    if(this.ipdprescriptObj) {
      localStorage.setItem("dischipdadmissionID", this.ipdprescriptObj.ipdID);
      localStorage.setItem("dischipdpatientID", this.ipdprescriptObj.patient_id);
    }
    this.ipdRowId = localStorage.getItem("dischipdadmissionID");
 


  }

  version = VERSION;

  private relations: Relation[] = [];
  private medicines: Medicine[] = [];
  private dosages: Dosage[] = [];
  private frequency: Frequency[] = [];
  private instructions: Instruction[] = [];
  private medreports: Reports[] = [];

  refferHospitals: Hospitals[] = [];
  
  public filteredMedicines: ReplaySubject<Medicine[]> = new ReplaySubject<Medicine[]>(1);
  public filteredDosages: ReplaySubject<Dosage[]> = new ReplaySubject<Dosage[]>(1);
  public filteredFrequency: ReplaySubject<Frequency[]> = new ReplaySubject<Frequency[]>(1);

  public filterRelations: ReplaySubject<Relation[]> = new ReplaySubject<Relation[]>(1);
  public filteredRelationsMulti: ReplaySubject<Relation[]> = new ReplaySubject<Relation[]>(1);

  public filteredInstruction: ReplaySubject<Frequency[]> = new ReplaySubject<Frequency[]>(1);
  public filteredReports: ReplaySubject<Reports[]> = new ReplaySubject<Reports[]>(1);


  private associatedEmplList: AssociatedEmpl[] = [];
  public filteredAssociatedEmpl: ReplaySubject<AssociatedEmpl[]> = new ReplaySubject<AssociatedEmpl[]>(1);

  // public filteredHospitals: ReplaySubject<Hospitals[]> = new ReplaySubject<Hospitals[]>(1);
  
  @ViewChild('singleSelect') singleSelect: MatSelect; 

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  ngOnInit() {

    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable Ipddischarge: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }
    
    this.getBloodGroup();
    this.getMedicine('A');


    // Investigation Dropdown Population
    this.getIvestigations();
    this.filteredReports.next(this.medreports.slice());
    this.ipdDischargeForm.get('reportsFilterCtrl').valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMedReports();
    });


      this.getHospitals();
      /*
      this.filteredHospitals.next(this.refferHospitals.slice());
      this.ipdDischargeForm.get('reffHospitalFilterCtrl').valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterHospital();
        });
      */

  



    /**
     * Setting Value to Field 
     */


    let response;
    let pdata;
    let symptomlist;
    let diagnosislist;
    let medicinedata;
    let reportdata;

    this.ipdService.ipdDetailInfoById(this.ipdRowId).then(data => {
      response = data;
      if(response.msg_status==200) {

        let discharDT ;
        let nextChkDt ;
        
        pdata = response.result ; 
        medicinedata = response.medicineInfo;
        reportdata = response.reportsInfo;

        discharDT = new Date(pdata.dischargeDate).toISOString();
        nextChkDt = new Date(pdata.nextChekUpDate).toISOString();

        if(pdata.dischargeDate == null) {
           discharDT = new Date().toISOString();
        }

        if(pdata.nextChekUpDate == null) {
          nextChkDt = new Date().toISOString();
        }

        if(pdata.discharge_flag && pdata.dischargeDate != null){
          this.isRemoveEnable = true;
        }


        if(pdata.patient_blood_grp == "" || pdata.patient_blood_grp == null) {
          this.ipdDischargeForm.controls['bldgrpCtrl'].enable();
        }
        else {
          this.ipdDischargeForm.controls['bldgrpCtrl'].disable();
        }
        
        // added on 23.02.2019
        nextChkDt='';

        this.ipdDischargeForm.patchValue({
          patientNameCtrl: pdata.patient_name,
          ipdRowIDCtrl: pdata.prescription_addmission_id,
          patientID: pdata.patientid,
          patientHelathProfileID: pdata.patient_health_profile_id,
          emplCodeCtrl: pdata.patient_code,
          dobCtrl: pdata.dob_dt,
          roomNoCtrl:pdata.room_no,
          bedNoCtrl:pdata.bed_no,
          genderCtrl:pdata.patient_gender,
          bldgrpCtrl:pdata.patient_blood_grp,
          ageCtrl:pdata.patient_age,
          patientAdvSearchCtrl:pdata.associate_permworker_name,
          patientTypeCtrl:pdata.patient_type,
          patinetNameCtrl:pdata.patient_name,
          
          bpCtrl: pdata.bp,
          bpDiastolicCtrl:pdata.bp_diastolic,
          haemoglobinCtrl: pdata.anemia,
          bldsugarFCtrl: pdata.blood_sugar_f,
          bldsugarPPCtrl: pdata.blood_sugar_pp,
          bldsugarRCtrl: pdata.blood_sugar_random,
          jaundiceCtrl: pdata.jaundice,
          tempCtrl: pdata.temp,
          heightCtrl: pdata.height,
          weightCtrl: pdata.weight,
          odemaCtrl: pdata.odema,
          instructionCommentCtrl:pdata.instruction,
          dischargeCommentCtrl:pdata.discharge_summary,
          finalCommentCtrl:pdata.final_digonosis,
          reffHospitalCtrl:pdata.referral_id,
          nextCheckUpDt: nextChkDt,
          dischargeDt: discharDT

      });
   

      const count3 = Object.keys(medicinedata).length;
      if(count3 >0 ){
        let resultObj3_medicine;
        let resultObj4_dosage;
        let resultObj5_frequency;
        for(let i = 0; i<count3; i++){

        resultObj3_medicine = {
            'id' : medicinedata[i].medicine_id,
            'name' : medicinedata[i].medicine_name,
            'type' : ''
        }
        
        resultObj4_dosage = {
          'id' : medicinedata[i].dose_id,
          'value' : medicinedata[i].value
          
        }

        resultObj5_frequency = {
          'id' : medicinedata[i].dose_id,
          'frequency' : medicinedata[i].frequency_name
        }

        const forDays = medicinedata[i].number_of_days_sick_leave ; 

        let data = {medicinetd:resultObj3_medicine, dosagetd:resultObj4_dosage, unittd: resultObj5_frequency , daystd:forDays , actiontd: 'x' };
        this.addedMeddata.push(data);
        console.log("medical ");
        console.log(this.addedMeddata);

        }

        
      
      }

      const count4 = Object.keys(reportdata).length;
        if(count4 > 0){
          let resultObj6_Reports;
          for(let i = 0; i<count4; i++) {
            resultObj6_Reports = {
              'id' : reportdata[i].test_id,
              'name' : reportdata[i].investigation_name
            }
            const reportdate = reportdata[i].date;
            let data = {invdate: reportdate, reports:resultObj6_Reports, action: 'x' };
            this.addedInvestigations.push(data);
          }
        }

   



       
  }
    else{
       
      }
     },

     error => {
         console.log("There is some error on submitting...");
     });


     /*
     * End Of Setting Value to Field 
     */



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
    let medicine = this.ipdDischargeForm.get('medicineCtrl').value;
    let dosage = this.ipdDischargeForm.get('dosageCtrl').value;
    let frequency = this.ipdDischargeForm.get('instructionCtrl').value;
    let days = this.ipdDischargeForm.get('daysCtrl').value;
    
    if(medicine == ""){
      this.medicineError = "Error : Select Medicine";
    }
    else{
      //let data = {datetd: date, medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
      let data = {medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
      this.addedMeddata.push(data);
  
      this.ipdDischargeForm.patchValue({
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
    let date = this.ipdDischargeForm.get('investigationDt').value;
    let report = this.ipdDischargeForm.get('reportsCtrl').value;

    if(report==""){
      this.testReportError = "Error : Select at least one test";
    }
    else{
      let data = {invdate: date, reports:report, action: 'x' };
      this.addedInvestigations.push(data);

      this.ipdDischargeForm.patchValue({
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
      let relation = this.ipdDischargeForm.get('relationCtrl').value;
      this.getChoosePatientList(empcode,relation);



  }

  getChoosePatientByRel(event) {
    // console.log(event.value.code);
  
   let relation = event.value;
   let empcode = this.ipdDischargeForm.get('employeeCode').value;
   console.log(empcode.code);
   this.getChoosePatientList(empcode.code,relation);



}

  selectPatient(event) {
    console.log(event);
    this.ipdDischargeForm.patchValue({
      patinetNameCtrl : event.value.patient_name ,
      bldgrpCtrl : event.value.blood_group 
    });
  }

  getChoosePatientList(empcode,relation) {
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
    this.ipdDischargeForm.get('dosageFilterCtrl').valueChanges
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
            this.ipdDischargeForm.get('instructionFilterCtrl').valueChanges
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





  onSubmit(formdata) {
    console.log(formdata);
      let response;
        this.ipdService.saveDischargeIPD(formdata,this.addedMeddata).then(data => {
          response = data;
          if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
            let presdata =  response.result;
            this.ipdDischargeForm.reset();
            this.addedMeddata = [];
            
            localStorage.removeItem("dischipdadmissionID");
            localStorage.removeItem("dischipdpatientID");
            //this.openDialog();
            console.log(presdata);
            this.openDialogWithPdfPreview(presdata.prescription,presdata.healthprfl,'I','DISCHARGE');


          }
          else{
            this.openDialogError();
          }
          console.log(response);
        },
        error => {
            console.log("There is some error on ipd discharge ...");
        });

       
  

  }

  openDialog() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'Discharged Successfully',
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
  this.ipdDischargeForm.get('medicineFilterCtrl').valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterMedicines();
    });

           
  },
  error => {
   console.log("There is some error in Medicine List...");
 });
}

getHospitals(){
  let dataval;
  let hospitallist;
  this.commonService.getHospitals().then(data => {
    dataval = data;
    hospitallist = dataval.result;
    this.refferHospitals.push(hospitallist);
    /*
    var count = Object.keys(dataval.result).length;
             let resultObj;
             for(let i = 0; i<count; i++){
              resultObj = {
                  'name':dataval.result[i].hospital_name,
                  'id': dataval.result[i].hospital_id
              }
              this.refferHospitals.push(resultObj);
          }
          // this.filteredHospitals.next(this.refferHospitals.slice());
    */
           
  },
  error => {
   console.log("There is some error in Investigation List...");
 });
}


removeIPDDischarge() {
  let ipdID = this.ipdDischargeForm.get("ipdRowIDCtrl").value;
  //console.log("Dialog ID "+ipdID);
  this.openConfirmationDialog(ipdID);
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
     localStorage.removeItem('dischipdadmissionID');
     localStorage.removeItem('dischipdpatientID');
     this.router.navigate(['/panel/ipdlist']);
    }
   
  });

}



openDialogWithPdfPreview(id,hid,ipdopd,callfrom) {
  let idinfo = {opdipdID:id,hlthPrflID:hid,ipdopd:ipdopd,callfrom:callfrom}
  const dialogRef = this.dialog.open(SuccessdialogwithprintComponent, {
    width: '850px',
    height:'550px',
    disableClose: true,
    data:  {
      msg : 'Saved Successfully',
      msgicon : 'check_circle',
      iconcolor: '#1d8c3d',
      btnurl : 'panel/ipdlist',
      savedIdRef  : idinfo
      }
  });

  dialogRef.afterClosed().subscribe(result => {
  
  });
}







  private filterAssociateEmployee() {
    if (!this.associatedEmplList) {
      return;
    }
    let search = this.ipdDischargeForm.get('emplCodeFilterCtrl').value;
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

/*
  private  filterHospital(){
    if (!this.refferHospitals) {
      return;
    }
    // get the search keyword
    let search =  this.ipdDischargeForm.get('reffHospitalFilterCtrl').value;
    if (!search) {
      this.filteredHospitals.next(this.refferHospitals.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredHospitals.next(
      this.refferHospitals.filter(reffhospital => reffhospital.name.toLowerCase().indexOf(search) > -1)
    );
  }
*/
  private filterMedReports() {
    if (!this.medreports) {
      return;
    }
    // get the search keyword
    let search =  this.ipdDischargeForm.get('reportsFilterCtrl').value;
    if (!search) {
      this.filteredReports.next(this.medreports.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredReports.next(
      this.medreports.filter(medreport => medreport.name.toLowerCase().indexOf(search) > -1)
    );
  }


  private filterMedicines() {
    if (!this.medicines) {
      return;
    }
    // get the search keyword
    let search =  this.ipdDischargeForm.get('medicineFilterCtrl').value;
    if (!search) {
      this.filteredMedicines.next(this.medicines.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMedicines.next(
      this.medicines.filter(medicine => medicine.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterDosage() {
    if (!this.dosages) {
      return;
    }
    // get the search keyword
    let search =  this.ipdDischargeForm.get('dosageFilterCtrl').value;
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
    let search =  this.ipdDischargeForm.get('instructionFilterCtrl').value;
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
}
