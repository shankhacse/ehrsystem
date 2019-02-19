import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild , ViewEncapsulation , Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommonService } from '../../../service/common.service';
import { SymptomdiseaseService } from '../../../service/symptomdisease.service';
import { Validators, FormBuilder, FormGroup, FormControl , FormArray  } from '@angular/forms';
import { DatashareService } from '../../../service/datashare.service';
import { PatientService } from '../../../service/patient.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { IpdService } from '../../../service/ipd.service';
import { SuccessdialogComponent } from '../../components/successdialog/successdialog.component';
import { SuccessdialogwithprintComponent } from '../../components/successdialogwithprint/successdialogwithprint.component';
import { MasterentrydialogComponent } from '../../components/masterentrydialog/masterentrydialog.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';




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

@Component({
  selector: 'app-pregnancy',
  templateUrl: './pregnancy.component.html',
  styleUrls: ['./pregnancy.component.css'] ,
  encapsulation: ViewEncapsulation.None
})

export class PregnancyComponent implements OnInit {


  @Input() presciptionHealthForm:FormGroup; 
  pregnancyVaccinationGivenForm : FormGroup;
  pregnencyestimatedForm : FormGroup;
  pregnencyMedicineTestForm : FormGroup;
  additionalInfoForm : FormGroup;
  
  relationsList = []; 
  vaccinationScheduleList = [];
  vaccinListData = [];
  medicinesItems : FormArray;
  patientObj;

  localStrgPcode = "";
  localStrgRid;
  localStrgPatientID;

  patientList = []; 
  bloodGroupList = [];
  addedMeddata = [];
  addedInvestigations = [];

  
  medicineError:string = "";
  testReportError:string = "";
  validFormErr:string = "";

  
  
  constructor(private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog ,  private fb: FormBuilder , public snackBar: MatSnackBar) { 
    
    this.pregnencyestimatedForm = new FormGroup({
        lmpDateCtrl : new FormControl('' , Validators.required),
        eddDateCtrl : new FormControl('' , Validators.required),
        bloodGrpCtrl : new FormControl({value: ''})
    });


    this.pregnencyMedicineTestForm = new FormGroup({
      medicineCtrl: new FormControl(''),
      medicineFilterCtrl: new FormControl(''),
      dosageCtrl: new FormControl(''),
      dosageFilterCtrl: new FormControl(''),
      instructionCtrl: new FormControl(''),
      instructionFilterCtrl: new FormControl(''),
      investigationDt: new FormControl(new Date().toISOString()),
      reportsCtrl: new FormControl(''),
      reportsFilterCtrl: new FormControl(''),
      daysCtrl: new FormControl('')
    });

    this.additionalInfoForm = new FormGroup({
      nextChkupDate: new FormControl(''),
      pregRemarks: new FormControl('')
    });

    this.patientObj = this.datashareService.getData();
    if(this.patientObj){
      localStorage.setItem("patientid_preg", this.patientObj.patient_id);
      localStorage.setItem("tpcd", this.patientObj.patient_code);
      localStorage.setItem("regid", this.patientObj.registration_id);
    }
   
    this.localStrgPcode = localStorage.getItem("tpcd");
    this.localStrgRid = localStorage.getItem("regid");
    this.localStrgPatientID = localStorage.getItem("patientid_preg");

    
}

lmpDate: Date; 


calEstimateDeliveryDate(type: string, event) {
  console.log(event.value)
  //new Date().toISOString()
   this.lmpDate = new Date(event.value);

  // EDD = LMP Date + 280 days

  this.lmpDate.setDate( this.lmpDate.getDate() + 280 );
  console.log(this.lmpDate);

  this.pregnencyestimatedForm.patchValue({
    eddDateCtrl:new Date(this.lmpDate).toISOString()
  });
  
}


  version = VERSION;
  
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

  @ViewChild('singleSelect') singleSelect: MatSelect; 
  private _onDestroy = new Subject<void>();

  ngOnInit() {
    this.pregnancyVaccinationGivenForm = this.fb.group({
      pregnancyVaccinRows: this.fb.array([])
    });


    this.getBloodGroup();

    this.getMedicine('A');


    // Investigation Dropdown Population
    this.getIvestigations();
    this.filteredReports.next(this.medreports.slice());
    this.pregnencyMedicineTestForm.get('reportsFilterCtrl').valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMedReports();
    });
    

    // Set data to field
    this.getVaccinationListBySchedule("PREGNANT_WOMEN" , this.localStrgPatientID);


    let response;
    let pdata;
    let symptomlist;
    let diagnosislist;
    let medicinedata;
    let reportdata;
    /* this.patientService.getPatientLastPrescByCode(this.localStrgPcode,"PREGNANCY").then(data => { */
    this.patientService.getPatientLastPrescByPatientID(localStorage.getItem("patientid_preg"),"PREGNANCY").then(data => {
      response = data;
      if(response.msg_status==200) {

        pdata = response.result ; 
        symptomlist = response.symptomsInfo;
        diagnosislist = response.diseaseInfo;
        medicinedata = response.medicineInfo;
        reportdata = response.reportsInfo;
        
        if(pdata.blood_group == "" || pdata.blood_group == null) {
          this.pregnencyestimatedForm.controls['bloodGrpCtrl'].enable();
          this.pregnencyestimatedForm.patchValue({
            bloodGrpCtrl: pdata.blood_group
          });
        }
        else {
          this.pregnencyestimatedForm.patchValue({
            bloodGrpCtrl: pdata.blood_group
          });
          this.pregnencyestimatedForm.controls['bloodGrpCtrl'].disable();
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
       // console.log("medical ");
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
    else{}
    },error => {console.log("There is some error ...");});



    let regType = localStorage.getItem("regtype");
    if(regType == "PREGNANCY") {
      let preg_response;
      let preg_pdata;
      this.patientService.getLastPregnencyData(this.localStrgPatientID).then(data => {
        preg_response = data;
        if(preg_response.msg_status==200) {
          preg_pdata = preg_response.result ; 

          this.pregnencyestimatedForm.patchValue({
            lmpDateCtrl : new Date(preg_pdata.lmp_date).toISOString(),
            eddDateCtrl : new Date(preg_pdata.estimate_delivery_date).toISOString()
          });

          this.additionalInfoForm.patchValue({
            nextChkupDate : new Date(preg_pdata.lmp_date).toISOString(),
            pregRemarks : preg_pdata.remarks
          });
          
        }
      else{}
      },error => {console.log("There is some error ...");});
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
    let medicine = this.pregnencyMedicineTestForm.get('medicineCtrl').value;
    let dosage = this.pregnencyMedicineTestForm.get('dosageCtrl').value;
    let frequency = this.pregnencyMedicineTestForm.get('instructionCtrl').value;
    let days = this.pregnencyMedicineTestForm.get('daysCtrl').value;
    
    if(medicine == ""){
      this.medicineError = "Error : Select Medicine";
    }
    else{
      //let data = {datetd: date, medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
      let data = {medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
      this.addedMeddata.push(data);
  
      this.pregnencyMedicineTestForm.patchValue({
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
    let date = this.pregnencyMedicineTestForm.get('investigationDt').value;
    let report = this.pregnencyMedicineTestForm.get('reportsCtrl').value;

    if(report==""){
      this.testReportError = "Error : Select at least one test";
    }
    else{
      let data = {invdate: date, reports:report, action: 'x' };
      this.addedInvestigations.push(data);

      this.pregnencyMedicineTestForm.patchValue({
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
    this.pregnencyMedicineTestForm.get('dosageFilterCtrl').valueChanges
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
            this.pregnencyMedicineTestForm.get('instructionFilterCtrl').valueChanges
              .pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterInstruction();
              });
             
    },
    error => {
     console.log("There is some error in Frequency List...");
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


  getVaccinationListBySchedule(schedule:String,patientID) {
    this.vaccinListData = [];
    let dataval;
    let vaccinelist;

    this.patientService.getVaccinationListBySchedule(schedule,patientID).then(data => {
      this.vaccinListData = [];
      dataval = data;
      vaccinelist = dataval.result;

      this.vaccinListData.push(vaccinelist);
      const count3 = Object.keys(vaccinelist).length;
         
      const control = <FormArray>this.pregnancyVaccinationGivenForm.controls['pregnancyVaccinRows'];
      control.controls = [];
          for(let i = 0 ; i < count3 ; i++ ) {
            let givendate = null;
            if(this.vaccinListData[0][i].patientVaccineData.vaccin_given_date == null) {
              givendate = null;
            } else {
              givendate = new Date(this.vaccinListData[0][i].patientVaccineData.vaccin_given_date).toISOString();
            }
            control.push(this.initializeVaccinationRows(
              this.localStrgPatientID,
              this.vaccinListData[0][i].vaccinData.id,
              this.vaccinListData[0][i].patientVaccineData.id,
              givendate
              ));

          }
    } ,

    error => {
     console.log("error in discharge ipd list");
   });

  }

  initializeVaccinationRows(patientID , vaccinID, vacingivenID , givendate) {
    return this.fb.group({
        patientHdnID : [patientID],
        vaccinID : [vaccinID],
        vaccinGivenID : [vacingivenID],
        vaccinGivenDt : [givendate]
      
    });
}

  

  
savePregnancy() {
    
    console.log(this.presciptionHealthForm.value);
    console.log(this.pregnancyVaccinationGivenForm.value);
    console.log(this.pregnencyMedicineTestForm.value);
    console.log(this.pregnencyestimatedForm.value);
    console.log(this.additionalInfoForm.value);
    console.log(this.addedMeddata);
    console.log(this.addedInvestigations);

    let objParam = {
      healthProfileInfo :this.presciptionHealthForm.value,
      estimatedPreginfo : this.pregnencyestimatedForm.value,
      medicineInfo : this.addedMeddata,
      investigationInfo : this.addedInvestigations,
      pregnancyVaccinInfo : this.pregnancyVaccinationGivenForm.value,
      additionalInfo : this.additionalInfoForm.value
    };

        console.log(objParam);
       
        let response;
        this.patientService.insertIntoPregnancy(objParam).then(data => {
          response = data;
          if(response.msg_data == "SUCCESS" && response.msg_status == "200") {
             let presdata =  response.result;
             localStorage.removeItem("patientid_preg");
             localStorage.removeItem("tpcd");
             localStorage.removeItem("regid");
            // this.openDialog();
            this.openDialogWithPdfPreview(presdata.prescription,presdata.healthprfl,'O','PREGNANCY');
            
         
          }
          else {
            // this.openDialogError();
          }
          console.log(response);
        },
        error => {
            console.log("There is some error on submitting...");
        });
      
      
  }

  openDialog() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'Saved Successfully',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/todaysreg'
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
        btnurl : 'panel/opd'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
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
        btnurl : 'panel/todaysreg',
        savedIdRef  : idinfo
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
  this.pregnencyMedicineTestForm.get('medicineFilterCtrl').valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterMedicines();
    });

           
  },
  error => {
   console.log("There is some error in Medicine List...");
 });
}








  private filterMedReports() {
    if (!this.medreports) {
      return;
    }
    // get the search keyword
    let search =  this.pregnencyMedicineTestForm.get('reportsFilterCtrl').value;
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
    let search =  this.pregnencyMedicineTestForm.get('medicineFilterCtrl').value;
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
    let search =  this.pregnencyMedicineTestForm.get('dosageFilterCtrl').value;
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
    let search =  this.pregnencyMedicineTestForm.get('instructionFilterCtrl').value;
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
