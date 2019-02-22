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
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig} from '@angular/material';
import { SuccessdialogComponent } from '../components/successdialog/successdialog.component';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { OpdprescriptionhistordialogComponent } from '../components/opdprescriptionhistordialog/opdprescriptionhistordialog.component';
import { MasterentrydialogComponent } from '../components/masterentrydialog/masterentrydialog.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { SuccessdialogwithprintComponent } from '../components/successdialogwithprint/successdialogwithprint.component';
import { OpdnewprescconfirmationdialogComponent } from '../components/opdnewprescconfirmationdialog/opdnewprescconfirmationdialog.component';






  export interface Transaction {
    item: string;
    cost: number;
  }


  export interface PeriodicElement {
    name: string;
    position: any;
    weight: any;
    symbol: string;
  }


  interface Symptoms{
    id: string,
    name: string
  }

  interface Diagnosis{
    id: string,
    name: string
  }

  interface Medicine{
    id: string,
    name: string,
    type: string
  }

  interface Dosage{
    id: string,
    value: string,
  }

  interface Frequency{
    id: string,
    frequency: string,
  }

  interface Relation{
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

  interface Hospitals{
    id: any;
    name: any;
  }


  export interface Bank {
    id: string;
    name: string;
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
  selector: 'app-opdprepration',
  templateUrl: './opdprepration.component.html',
  styleUrls: ['./opdprepration.component.css'],
   encapsulation: ViewEncapsulation.None
   
})
export class OpdpreprationComponent implements OnInit, OnDestroy {



  public selectedTab = 0;
  disableConsultTAB = false;
  disablePregnancyTAB = true;
  disableVaccinationTAB = true;

  patientData ;
  PatientID = null;
  PatientName = null;
  PatientType = null;
  PatientAge = null;

  medicineError:string = "";
  testReportError:string = "";
  validFormErr:string = "";
  lastPresciptionID:number = 0;
  masterDataList = [];
  

  displayedColumns: string[] = [ 'datetd' , 'medicinetd' , 'dosagetd' , 'unittd', 'daystd' , 'actiontd'];
  
  dataSource = [];

  displayedColumnsReport: string[] = [ 'datetd' , 'reportdtd', 'actiontd'];
  
  addedMeddata = [];
  addedInvestigations = [];

  patientObj;
  presciptionHealthForm : FormGroup;
  presciptionForm : FormGroup;
  sendPhrmcyBtnActive = true;
  localStrgPcode = "";
  localStrgRid;

    constructor(private router:Router, private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog, public snackBar: MatSnackBar) {
   
      this.presciptionForm = new FormGroup({
        symptomsMultiCtrl: new FormControl(''),
        symptomsMultiFilterCtrl: new FormControl(''),
        diagnosisMultiCtrl: new FormControl(''),
        diagnosisMultiFilterCtrl: new FormControl(''),
    //    date: new FormControl(new Date().toISOString()),
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
        finalsummryCtrl: new FormControl(''),
        sickCtrl: new FormControl(''),
        sickdaysCtrl: new FormControl({value: '', disabled: true}),
        approvalCtrl: new FormControl(''),
        admitCtrl: new FormControl(''),
        observCtrl: new FormControl(''),
        isReffHospital: new FormControl(''),
        reffHospitalCtrl: new FormControl({value: '', disabled: true}),
        reffHospitalFilterCtrl: new FormControl('')
      });

      this.presciptionHealthForm = new FormGroup({
        hdnpatientID: new FormControl(''),
        hdnregistrationID: new FormControl(''),
        hdnpresciptionID: new FormControl(''),
        patientID: new FormControl({value: '', disabled: true}),
        prescpID: new FormControl({value: '', disabled: true}),
        patientType: new FormControl({value: '', disabled: true}),
        patientName: new FormControl({value: '', disabled: true}),
        patientAge: new FormControl({value: '', disabled: true}),
        pulse: new FormControl(''),
        tempratute: new FormControl(''),
        anaemia: new FormControl(''),
        bp: new FormControl(''), // used as BP Systolic
        jaundice: new FormControl(''),
        odema: new FormControl(''),
        height: new FormControl(''),
        weight: new FormControl(''),

        bpDiastolicCtrl: new FormControl(''),
        bldsugarFCtrl: new FormControl(''),
        bldsugarPPCtrl: new FormControl(''),
        bldsugarRCtrl: new FormControl('')
      
      });

    this.patientObj = this.datashareService.getData();
      console.log("OPD Patient Obj");
      console.log(this.patientObj);
      console.log("End OPD Patient Obj");

    if(this.patientObj){
      localStorage.setItem("tpcd", this.patientObj.patient_code);
      localStorage.setItem("regid", this.patientObj.registration_id);
      localStorage.setItem("consult_pid", this.patientObj.patient_id); // added later
      localStorage.setItem("regtype", this.patientObj.reg_type); // added later
    }
   
    this.localStrgPcode = localStorage.getItem("tpcd");
    this.localStrgRid = localStorage.getItem("regid");

   
      

    }



    version = VERSION;
 
    private relations: Relation[] = [];
    private symptoms: Symptoms[] = [];
    private diagnosis: Diagnosis[] = [];
    private medicines: Medicine[] = [];
    private dosages: Dosage[] = [];
    private frequency: Frequency[] = [];

    private selectedSymptom: Symptoms[] = [];

    instructions: Instruction[] = [];
    medreports: Reports[] = [];
    refferHospitals: Hospitals[] = [];





    public filteredMedicines: ReplaySubject<Medicine[]> = new ReplaySubject<Medicine[]>(1);
    public filteredDosages: ReplaySubject<Dosage[]> = new ReplaySubject<Dosage[]>(1);
    public filteredFrequency: ReplaySubject<Frequency[]> = new ReplaySubject<Frequency[]>(1);

    public filterRelations: ReplaySubject<Relation[]> = new ReplaySubject<Relation[]>(1);
    public filteredRelationsMulti: ReplaySubject<Relation[]> = new ReplaySubject<Relation[]>(1);

    public filteredInstruction: ReplaySubject<Frequency[]> = new ReplaySubject<Frequency[]>(1);
    public filteredReports: ReplaySubject<Reports[]> = new ReplaySubject<Reports[]>(1);
    public filteredHospitals: ReplaySubject<Hospitals[]> = new ReplaySubject<Hospitals[]>(1);
    


    public filterSymptom: ReplaySubject<Symptoms[]> = new ReplaySubject<Symptoms[]>(1);
    public filteredSymptomMulti: ReplaySubject<Symptoms[]> = new ReplaySubject<Symptoms[]>(1);

    public filterDiagnosis: ReplaySubject<Diagnosis[]> = new ReplaySubject<Diagnosis[]>(1);
    public filteredDiagnosisMulti: ReplaySubject<Diagnosis[]> = new ReplaySubject<Diagnosis[]>(1);




  
    @ViewChild('singleSelect') singleSelect: MatSelect; 
    @ViewChild('multiSelect') multiSelect: MatSelect;
  
    /** Subject that emits when the component has been destroyed. */
    private _onDestroy = new Subject<void>();
  
  

    ngOnInit() {

     
      let regType = localStorage.getItem("regtype");
      if(regType == "CONSULTATION") { 
        this.selectedTab = 0;
        this.disableConsultTAB = false;
        this.disablePregnancyTAB = true;
        this.disableVaccinationTAB = true;
      }
      if(regType == "PREGNANCY") {

        this.selectedTab = 1;
        this.disableConsultTAB = true;
        this.disablePregnancyTAB = false;
        this.disableVaccinationTAB = true;

      }
      if(regType == "VACCINATION") { 
        this.selectedTab = 2;
        
        this.disableConsultTAB = true;
        this.disablePregnancyTAB = true;
        this.disableVaccinationTAB = false;

      }
  
     


      this.getSymptoms();
      
      this.filteredSymptomMulti.next(this.symptoms.slice());
      this.presciptionForm.get('symptomsMultiFilterCtrl').valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSymptomsMulti();
      });


      
      this.getIvestigations();
      this.filteredReports.next(this.medreports.slice());
      this.presciptionForm.get('reportsFilterCtrl').valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMedReports();
        });


      this.getHospitals();
      this.filteredHospitals.next(this.refferHospitals.slice());
      this.presciptionForm.get('reffHospitalFilterCtrl').valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterHospital();
        });
  

      let response;
      let pdata;
      let symptomlist;
      let diagnosislist;
      let medicinedata;
      let reportdata;

      // Data For Consultation Type  Note:: Pregnancy and vaccination embed from partial component
      /*
      closed on 07.02.2019 
      this.patientService.getPatientLastPrescByCode(this.localStrgPcode,"CONSULTATION").then(data => {*/
      this.patientService.getPatientLastPrescByPatientID(localStorage.getItem('consult_pid'),"CONSULTATION").then(data => {
        response = data;
        if(response.msg_status==200) {
          pdata = response.result ; 
          symptomlist = response.symptomsInfo;
          diagnosislist = response.diseaseInfo;
          medicinedata = response.medicineInfo;
          reportdata = response.reportsInfo;

          let patientage="";
          if(pdata.age == null){
            patientage = response.age;
          }
          else{
            patientage = pdata.age;
          }

          this.presciptionHealthForm.patchValue({
            /* hdnpatientID: pdata.patient_code, */
            hdnpatientID: pdata.patientid,
            hdnregistrationID: this.localStrgRid,
            hdnpresciptionID:pdata.prescription_addmission_id,
            patientID: pdata.patient_code,
            prescpID: response.prescriptionID,
            patientType: pdata.patient_type,
            patientName: pdata.patient_name,
            patientAge: patientage,
            pulse: pdata.pulse,
            tempratute: pdata.temp,
            anaemia: pdata.anemia,
            bp: pdata.bp,
            jaundice: pdata.jaundice,
            odema: pdata.odema,
            height: pdata.height,
            weight: pdata.weight,
            bpDiastolicCtrl: pdata.bp_diastolic,
            bldsugarFCtrl: pdata.blood_sugar_f,
            bldsugarPPCtrl: pdata.blood_sugar_pp,
            bldsugarRCtrl: pdata.blood_sugar_random
        });


        const sickCtrlStatus = pdata.sick_flag == 'Y'  ? true : false;
        if(pdata.sick_flag == 'Y'){
          this.presciptionForm.controls['sickdaysCtrl'].enable();

        }
        const accidental_approval = pdata.accidental_approval == 1  ? true : false;
        const keepObserv = pdata.keep_in_observation == 1  ? true : false;
        const isAdmit = pdata.keep_in_observation == 0  ? true : false;
        const isreferal = pdata.hospital_rec_flag == 1  ? true : false;

        if(pdata.hospital_rec_flag == 1){
          this.presciptionForm.controls['reffHospitalCtrl'].enable(); 
        
        }

        if(pdata.accidental_approval == 1 ) {
            this.presciptionForm.patchValue({
              approvalCtrl : accidental_approval,
              observCtrl : keepObserv,
              admitCtrl : isAdmit ,
              
            });
        }

        this.presciptionForm.patchValue({
          finalsummryCtrl: pdata.comments,
          sickCtrl: sickCtrlStatus,
          sickdaysCtrl : pdata.no_of_days_sick,
          isReffHospital : isreferal
        });

        
       
        const count1 = Object.keys(symptomlist).length;
        if(count1 > 0) {
            let resultObj1;
            for(let i = 0; i<count1; i++){
            resultObj1 = {
                'name':symptomlist[i].symptom,
                'id': symptomlist[i].symptom_id
            }
           // this.selectedSymptom.push(resultObj1);
            this.symptoms.push(resultObj1);
            this.selectedSymptom.push(this.symptoms[i]);
            }
          
          this.presciptionForm.get("symptomsMultiCtrl").setValue(this.selectedSymptom);
      
        }
        

        const count2 = Object.keys(diagnosislist).length;
        if(count2 > 0 ){
            let resultObj2;
            for(let i = 0; i<count2; i++){
            resultObj2 = {
                'name':diagnosislist[i].diagonosis_name,
                'id': diagnosislist[i].diagonosis_id
            }
            this.diagnosis.push(resultObj2);
            }
            this.filteredDiagnosisMulti.next(this.diagnosis.slice());
            this.presciptionForm.get("diagnosisMultiCtrl").setValue(this.diagnosis);
            let medicinObj = {
              "value" : this.diagnosis
            }
            this.getMedicine(medicinObj);
           
        }

        const count3 = Object.keys(medicinedata).length;
        if(count3 >0 ) {
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

        let referalHosp_Obj = {
          "id" : pdata.referal_hospital_id,
          "name" : pdata.hospital_name
        }
        this.refferHospitals.push(referalHosp_Obj);
       
        this.presciptionForm.get("reffHospitalCtrl").setValue(this.refferHospitals[0]);


        /*
        let data = {medicinetd:'fd', dosagetd:"dgf", unittd: 4 , daystd:15 , actiontd: 'x' };
        th is.addedMeddata.push(data);
        */     
    }
      else{
         
        }
       },

       error => {
           console.log("There is some error on submitting...");
       });

    }

    
  
    validateRecomChkBox(event,tag){
      if(tag == "ADMIT"){
        this.presciptionForm.patchValue({
          observCtrl: false
         });
      }
      if(tag == "OBSERVATION"){
        this.presciptionForm.patchValue({
          admitCtrl: false
         });
      }
    }

    enableSickDay(event){
      if(event.checked){
      
        this.presciptionForm.controls['sickdaysCtrl'].enable(); 
      }
      else{
        this.presciptionForm.patchValue({
          sickdaysCtrl: ''
        });
        this.presciptionForm.controls['sickdaysCtrl'].disable(); 
      }
    }

    enableReffHospital(event){
      if(event.checked){
      
        this.presciptionForm.controls['reffHospitalCtrl'].enable(); 
      }
      else{
        this.presciptionForm.patchValue({
          reffHospitalCtrl: ''
        });
        this.presciptionForm.controls['reffHospitalCtrl'].disable(); 
      }
    }
  
    ngOnDestroy() {
      this._onDestroy.next();
      this._onDestroy.complete();
    }
  
   
  
  private filterSymptomsMulti() {
      if (!this.symptoms) {
        return;
      }
      // get the search keyword
      let search =  this.presciptionForm.get('symptomsMultiFilterCtrl').value;
      if (!search) {
        this.filteredSymptomMulti.next(this.symptoms.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the banks
      this.filteredSymptomMulti.next(
        this.symptoms.filter(symptom => symptom.name.toLowerCase().indexOf(search) > -1)
      );
    }

    private filterDiagnosisMulti() {
      if (!this.diagnosis) {
        return;
      }
      // get the search keyword
      let search =  this.presciptionForm.get('diagnosisMultiFilterCtrl').value;
      if (!search) {
        this.filteredDiagnosisMulti.next(this.diagnosis.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the banks
      this.filteredDiagnosisMulti.next(
        this.diagnosis.filter(diagnos => diagnos.name.toLowerCase().indexOf(search) > -1)
      );
    }


    private filterMedicines() {
      if (!this.medicines) {
        return;
      }
      // get the search keyword
      let search =  this.presciptionForm.get('medicineFilterCtrl').value;
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
      let search =  this.presciptionForm.get('dosageFilterCtrl').value;
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
      let search =  this.presciptionForm.get('instructionFilterCtrl').value;
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

    private filterMedReports() {
      if (!this.medreports) {
        return;
      }
      // get the search keyword
      let search =  this.presciptionForm.get('reportsFilterCtrl').value;
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

    private  filterHospital(){
      if (!this.refferHospitals) {
        return;
      }
      // get the search keyword
      let search =  this.presciptionForm.get('reffHospitalFilterCtrl').value;
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


    addMedicine() {
      this.medicineError = "";
      //let date = this.presciptionForm.get('date').value;
      let medicine = this.presciptionForm.get('medicineCtrl').value;
      let dosage = this.presciptionForm.get('dosageCtrl').value;
      let frequency = this.presciptionForm.get('instructionCtrl').value;
      let days = this.presciptionForm.get('daysCtrl').value;
      
      if(medicine == ""){
        this.medicineError = "Error : Select Medicine";
      }
      else{
        //let data = {datetd: date, medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
        let data = {medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
        this.addedMeddata.push(data);
    
        this.presciptionForm.patchValue({
          medicineCtrl:'',
          dosageCtrl:'',
          instructionCtrl:'',
          daysCtrl:''
        });
    
      }
      
    
  
  }

  addInvestigation(){
    this.testReportError = "";
    let date = this.presciptionForm.get('investigationDt').value;
    let report = this.presciptionForm.get('reportsCtrl').value;

    if(report==""){
      this.testReportError = "Error : Select at least one test";
    }
    else{
      let data = {invdate: date, reports:report, action: 'x' };
      this.addedInvestigations.push(data);

      this.presciptionForm.patchValue({
        reportsCtrl:''
      });

    }
  }

  removeData(i){
    this.addedMeddata.splice(i, 1);
  }

  removeMedReports(i){
    this.addedInvestigations.splice(i, 1);
  }

    onSubmit(){
     /*console.log(this.presciptionForm.value);
     console.log(this.addedMeddata);
     console.log(this.addedInvestigations);
     console.log(this.presciptionHealthForm.value);*/

      console.log("Prescript Valid is "+this.validatePresciptionForm());

    if(this.validatePresciptionForm()) {

      this.sendPhrmcyBtnActive = false;
      let response;
     // this.openDialogTest(53,110);
     
      this.symptomdiseaseService.insertToOPD(this.presciptionHealthForm.value,this.presciptionForm.value,this.addedMeddata,this.addedInvestigations).then(data => {
        response = data;
          this.sendPhrmcyBtnActive = true;
        if(response.msg_status == 200) {
          let presdata =  response.result;
          
          localStorage.removeItem("regtype");
          localStorage.removeItem("tpcd");
          localStorage.removeItem("regid");
          localStorage.removeItem("consult_pid");
          this.openDialogWithPdfPreview(presdata.prescription,presdata.healthprfl,'O','CONSULTATION');

        }
        else{
       
        }
       },
         error => {
           console.log("There is some error on submitting...");
       });
     
      

    }


    }

    validatePresciptionForm() {
      this.validFormErr = "";
      let validForm = false;
      if(this.presciptionForm.controls['sickCtrl'].value) {
            if(this.presciptionForm.controls['sickdaysCtrl'].value <= 0 ) {
              this.validFormErr = "Error : Sick Days must be greater than 0";
              //validForm = false;
              return false;
            }
            
            return true
      }
      else {
        return true;
        
      }
      
    
    }

    resetPresForm(){
     // this.presciptionForm.reset();
       
        this.presciptionForm.patchValue({
        symptomsMultiCtrl: '',
        symptomsMultiFilterCtrl: '',
        diagnosisMultiCtrl: '',
        diagnosisMultiFilterCtrl: '',
      //  date: new Date().toISOString(),
        medicineCtrl: '',
        medicineFilterCtrl: '',
        dosageCtrl: '',
        dosageFilterCtrl: '',
        instructionCtrl: '',
        instructionFilterCtrl: '',
        investigationDt: new Date().toISOString(),
        reportsCtrl: '',
        reportsFilterCtrl: '',
        daysCtrl: '',
        finalsummryCtrl: '',
        sickCtrl: '',
        sickdaysCtrl: '', 
        approvalCtrl: '',
        admitCtrl: '',
        observCtrl: '',
        isReffHospital: '',
        reffHospitalCtrl: '',
        reffHospitalFilterCtrl: ''
       

      });

      this.addedMeddata = [];
      this.addedInvestigations = [];
     
     
    }

    clearFormValidErr(event){
      this.validFormErr = "";
    }
    

    
    openNewFormConfirmationDialog() {
      const dialogRef = this.dialog.open(OpdnewprescconfirmationdialogComponent, {
        disableClose: true
      });
    
      dialogRef.afterClosed().subscribe(result => {
        //console.log(result);
        if(result.status=="YES") {
          this.resetPresForm();
        }
        
      });
    }


    getIvestigations(){
      this.medreports = [];
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

    getHospitals(){
      let dataval;
      let hospitallist;
      this.commonService.getHospitals().then(data => {
        dataval = data;
        hospitallist = dataval.result;
        var count = Object.keys(dataval.result).length;
                 let resultObj;
                 for(let i = 0; i<count; i++){
                  resultObj = {
                      'name':dataval.result[i].hospital_name,
                      'id': dataval.result[i].hospital_id
                  }
                  this.refferHospitals.push(resultObj);
              }
              this.filteredHospitals.next(this.refferHospitals.slice());

               
      },
      error => {
       console.log("There is some error in hospital List...");
     });
    }


    getSymptoms(){
      let dataval;
      let symptomlist;
      this.symptomdiseaseService.getSymptoms().then(data => {
        this.symptoms = [];
        dataval = data;
        symptomlist = dataval.result;
        var count = Object.keys(dataval.result).length;

                 let resultObj;
                 for(let i = 0; i<count; i++){
                  resultObj = {
                      'name':dataval.result[i].symptom,
                      'id': dataval.result[i].symptom_id
                  }
                  this.symptoms.push(resultObj);
                  
              }
              this.filteredSymptomMulti.next(this.symptoms.slice());
              // this.presciptionForm.get("symptomsMultiCtrl").setValue([this.symptoms[0],this.symptoms[1]]);
            
            

               
      },
      error => {
       console.log("There is some error in Relation List...");
     });
    }


    getDiseaseList(obj){
     
      let dataval;
      let diagnosislist;
      this.diagnosis = [];
      this.symptomdiseaseService.getDiseasesBySymptom(obj.value).then(data => {
        dataval = data;
        diagnosislist = dataval.result;
        var count = Object.keys(dataval.result).length;
                 let resultObj;
                 for(let i = 0; i<count; i++){
                  resultObj = {
                      'name':dataval.result[i].diagonosis_name,
                      'id': dataval.result[i].diagonosis_id	
                  }
                  this.diagnosis.push(resultObj);
              }
              this.filteredDiagnosisMulti.next(this.diagnosis.slice());
              this.presciptionForm.get('diagnosisMultiFilterCtrl').valueChanges
              .pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterDiagnosisMulti();
              });

               
      },
      error => {
       console.log("There is some error in Diagnosis List...");
     });
    }

    getMedicine(obj){
      let dataval;
      let medicinelist;
      this.medicines = [];
      this.symptomdiseaseService.getMedicineByDisease(obj.value).then(data => {
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
      this.presciptionForm.get('medicineFilterCtrl').valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMedicines();
        });

               
      },
      error => {
       console.log("There is some error in Medicine List...");
     });
    }

    clearTestError(obj){
      this.testReportError = "";
    }

    getOtherDependent(obj){
      this.medicineError = "";
      this.getDosage(obj);
      this.getFrequency(obj);
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
      this.presciptionForm.get('dosageFilterCtrl').valueChanges
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
              this.presciptionForm.get('instructionFilterCtrl').valueChanges
                .pipe(takeUntil(this._onDestroy))
                .subscribe(() => {
                  this.filterInstruction();
                });
               
      },
      error => {
       console.log("There is some error in Frequency List...");
     });
    }




    gotoList(){
      this.router.navigateByUrl('panel/todaysnewreg');
    }

    openDialog() {
      const dialogRef = this.dialog.open(SuccessdialogComponent, {
        width: '350px',
        disableClose: true,
        data:  {
          msg : 'OPD Saved Successfully',
          msgicon : 'check_circle',
          iconcolor: '#1d8c3d',
          btnurl : 'panel/todaysnewreg'
          }
      });
    
      dialogRef.afterClosed().subscribe(result => {
      
      });
    }

    getOpdPrescHistory() {
      const dialogRef = this.dialog.open(OpdprescriptionhistordialogComponent, {
        width: '550px',
        disableClose: true,
        data:  {
          msg : 'OPD Saved Successfully',
          msgicon : 'check_circle',
          iconcolor: '#1d8c3d',
          btnurl : 'panel/todaysnewreg'
          }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    openSignSymptomsEntryDialog() {

      let fields = [
        {
          "ctrlname" : "symptomCtrl",
          "inputtyep" : "text",
          "placeholder" : "Symptom Name *",
           "defaultdata" : null
        }
        
      ];


   

      let formCtrlInilize = {
        symptomCtrl : new FormControl('',Validators.required),
        symptomGrpCtrl: new FormControl(),
      }

      const dialogRef = this.dialog.open(MasterentrydialogComponent, {
        width: '350px',
        disableClose: true,
        data:  {
          fielddatas : fields,
          initializeField:formCtrlInilize,
          iconcolor: '#1d8c3d',
          tbl : 'symptoms',
          datafrom : 'SYMPTOMS',
          heading:'Add Symptoms'
        
          }
      });
    
      dialogRef.afterClosed().subscribe(result => {
   

        if(result.from=="Save") {
          this.openSnackBar("Symptom Added successfully");
          this.getSymptoms();
        }
      });
    }

    openDiagnosisEntryDialog() {
      
      let symptomselectedval = this.presciptionForm.get("symptomsMultiCtrl").value;
      console.log(symptomselectedval);
     
      let fields = [
        {
          "ctrlname" : "diagonosisNameCtrl",
          "inputtyep" : "text",
          "placeholder" : "Diagonosis Name *"
        },
        {
          "ctrlname" : "accociatedIcdCtrl",
          "inputtyep" : "text",
          "placeholder" : "ICD Code"
        }
      ];

      let formCtrlInilize = {
        diagonosisNameCtrl : new FormControl('',Validators.required),
        accociatedIcdCtrl: new FormControl(),
      }

      const dialogRef = this.dialog.open(MasterentrydialogComponent, {
        width: '350px',
        disableClose: true,
        data:  {
          fielddatas : fields,
          initializeField:formCtrlInilize,
          iconcolor: '#1d8c3d',
          tbl : 'diagonosis',
          datafrom : 'DIAGONOSIS',
          heading:'Add Diagnosis'
         }
      });
    
      dialogRef.afterClosed().subscribe(result => {
          //this.getDiseaseList(this.presciptionForm.get("symptomsMultiCtrl").value);
          if(result.from=="Save") {
            this.openSnackBar("Diagnosis Added successfully");
            this.getDiseaseList(this.presciptionForm.get('symptomsMultiCtrl'));
          }
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



    openDialogWithPdfPreview(id,hid,ipdopd,callfrom) {
      let idinfo = {opdipdID:id,hlthPrflID:hid,ipdopd:ipdopd,callfrom:callfrom}
      const dialogRef = this.dialog.open(SuccessdialogwithprintComponent, {
        width: '850px',
        height:'550px',
        disableClose: true,
        data:  {
          msg : 'OPD Saved Successfully',
          msgicon : 'check_circle',
          iconcolor: '#1d8c3d',
          btnurl : 'panel/todaysnewreg',
          savedIdRef  : idinfo
          }
      });
    
      dialogRef.afterClosed().subscribe(result => {
      
      });
    }


}
