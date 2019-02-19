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
import { IpdvisithistordialogComponent } from '../components/ipdvisithistordialog/ipdvisithistordialog.component';
import { MasterentrydialogComponent } from '../components/masterentrydialog/masterentrydialog.component';
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

interface AssociatedEmpl {
  id: string,
  code: string,
  name: string
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
  selector: 'app-ipdvisit',
  templateUrl: './ipdvisit.component.html',
  styleUrls: ['./ipdvisit.component.css'] ,
  encapsulation: ViewEncapsulation.None

})
export class IpdvisitComponent implements OnInit {

  displayedColumns: string[] = [ 'datetd' , 'medicinetd' , 'dosagetd' , 'unittd', 'daystd' , 'actiontd'];
  
  dataSource = [];

  displayedColumnsReport: string[] = [ 'datetd' , 'reportdtd', 'actiontd'];

  ipdprescriptObj;
  ipdRowId = "0";

  ipdVisitRegistrationForm : FormGroup;
  patientList = []; 
  relationsList = []; 
  bloodGroupList = [];
  addedMeddata = [];
  addedInvestigations = [];

  
  medicineError:string = "";
  testReportError:string = "";
  validFormErr:string = "";

  constructor(private router:Router, private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog , private ipdService:IpdService,public snackBar: MatSnackBar) { 
    
    this.ipdVisitRegistrationForm = new FormGroup({
      visitDtCtrl: new FormControl(new Date().toISOString()),
      ipdRowIDCtrl: new FormControl({value: ''}, Validators.required),
      patientID:new FormControl({value: ''}, Validators.required),
      patientNameCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      dobCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      emplCodeCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      bldgrpCtrl: new FormControl({value: '', disabled: true}, Validators.required),
      bpCtrl: new FormControl(''),
      haemoglobinCtrl: new FormControl(''),
      bldsugarFCtrl: new FormControl(''),
      bldsugarPPCtrl: new FormControl(''),
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
      doctorCommentCtrl : new FormControl('')
     
      
    });


    this.ipdprescriptObj = this.datashareService.getIPDRowData();
    console.log("IPD Visit");
    console.log(this.ipdprescriptObj);
    if(this.ipdprescriptObj) {
      localStorage.setItem("ipdadmissionID", this.ipdprescriptObj.ipdID);
      localStorage.setItem("ipdpatientID", this.ipdprescriptObj.patient_id);
    }
    this.ipdRowId = localStorage.getItem("ipdadmissionID");
 


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
    
    this.getBloodGroup();
    this.getMedicine('A');


    // Investigation Dropdown Population
    this.getIvestigations();
    this.filteredReports.next(this.medreports.slice());
    this.ipdVisitRegistrationForm.get('reportsFilterCtrl').valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMedReports();
    });




  



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


        pdata = response.result ; 
       
      
        medicinedata = response.medicineInfo;
        reportdata = response.reportsInfo;

        if(pdata.blood_group == "" || pdata.blood_group == null) {
          this.ipdVisitRegistrationForm.controls['bldgrpCtrl'].enable();
        }
        else {
          this.ipdVisitRegistrationForm.controls['bldgrpCtrl'].disable();
        }



        this.ipdVisitRegistrationForm.patchValue({
          patientNameCtrl: pdata.patient_name,
          ipdRowIDCtrl: pdata.prescription_addmission_id,
          patientID: pdata.patientid,
          emplCodeCtrl: pdata.patient_code,
          dobCtrl: pdata.dob_dt,
          bldgrpCtrl:pdata.blood_group,
          bpCtrl: pdata.bp,
          haemoglobinCtrl: pdata.anemia,
          bldsugarFCtrl: pdata.blood_sugar_f,
          bldsugarPPCtrl: pdata.blood_sugar_pp,
          jaundiceCtrl: pdata.jaundice,
          tempCtrl: pdata.temp,
          heightCtrl: pdata.height,
          weightCtrl: pdata.weight,
          odemaCtrl: pdata.anemia,
          doctorCommentCtrl:pdata.doctorcomment
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
    let medicine = this.ipdVisitRegistrationForm.get('medicineCtrl').value;
    let dosage = this.ipdVisitRegistrationForm.get('dosageCtrl').value;
    let frequency = this.ipdVisitRegistrationForm.get('instructionCtrl').value;
    let days = this.ipdVisitRegistrationForm.get('daysCtrl').value;
    
    if(medicine == ""){
      this.medicineError = "Error : Select Medicine";
    }
    else{
      //let data = {datetd: date, medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
      let data = {medicinetd:medicine, dosagetd:dosage, unittd: frequency , daystd:days , actiontd: 'x' };
      this.addedMeddata.push(data);
  
      this.ipdVisitRegistrationForm.patchValue({
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
    let date = this.ipdVisitRegistrationForm.get('investigationDt').value;
    let report = this.ipdVisitRegistrationForm.get('reportsCtrl').value;

    if(report==""){
      this.testReportError = "Error : Select at least one test";
    }
    else{
      let data = {invdate: date, reports:report, action: 'x' };
      this.addedInvestigations.push(data);

      this.ipdVisitRegistrationForm.patchValue({
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
      let relation = this.ipdVisitRegistrationForm.get('relationCtrl').value;
      this.getChoosePatientList(empcode,relation);



  }

  getChoosePatientByRel(event) {
    // console.log(event.value.code);
  
   let relation = event.value;
   let empcode = this.ipdVisitRegistrationForm.get('employeeCode').value;
   console.log(empcode.code);
   this.getChoosePatientList(empcode.code,relation);



}

  selectPatient(event) {
    console.log(event);
    this.ipdVisitRegistrationForm.patchValue({
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
    this.ipdVisitRegistrationForm.get('dosageFilterCtrl').valueChanges
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
            this.ipdVisitRegistrationForm.get('instructionFilterCtrl').valueChanges
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
      //console.log(formdata);
      let response;
        this.ipdService.saveRegularVisitIPD(formdata,this.addedMeddata,this.addedInvestigations).then(data => {
          response = data;
          if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
            this.openDialog();
            this.ipdVisitRegistrationForm.reset();
            this.addedMeddata = [];
            this.addedInvestigations = [];

            localStorage.removeItem("ipdadmissionID");
            localStorage.removeItem("ipdpatientID");
          }
          else{
            this.openDialogError();
          }
          console.log(response);
        },
        error => {
            console.log("There is some error on ipd regular visit submitting...");
        });

       
  

  }


  visitIPDHistory() {
    const dialogRef = this.dialog.open(IpdvisithistordialogComponent, {
      width: '550px',
     // height: '480px',
      disableClose: true,

   
      data:  {
        patientobj : this.datashareService.getIPDRowData(),
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/ipdlist'
        }


    });
  
    dialogRef.afterClosed().subscribe(result => {
    
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
  this.ipdVisitRegistrationForm.get('medicineFilterCtrl').valueChanges
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
    let search = this.ipdVisitRegistrationForm.get('emplCodeFilterCtrl').value;
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
    let search =  this.ipdVisitRegistrationForm.get('reportsFilterCtrl').value;
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
    let search =  this.ipdVisitRegistrationForm.get('medicineFilterCtrl').value;
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
    let search =  this.ipdVisitRegistrationForm.get('dosageFilterCtrl').value;
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
    let search =  this.ipdVisitRegistrationForm.get('instructionFilterCtrl').value;
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
