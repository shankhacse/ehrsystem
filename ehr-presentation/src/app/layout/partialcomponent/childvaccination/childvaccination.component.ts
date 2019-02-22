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


interface AssociatedEmpl {
  id: string,
  code: string,
  name: string
}


@Component({
  selector: 'app-childvaccination',
  templateUrl: './childvaccination.component.html',
  styleUrls: ['./childvaccination.component.css']
})
export class ChildvaccinationComponent implements OnInit {

  @Input() presciptionHealthForm:FormGroup; 
  vaccinationInfoForm : FormGroup;
  vaccinationGivenForm : FormGroup;
  vaccinationDctrForm : FormGroup;
  
  relationsList = []; 
  vaccinationScheduleList = [];
  vaccinListData = [];
  medicinesItems : FormArray;
  patientObj;

  localStrgPcode = "";
  localStrgRid;
  localStrgPatientID;
  
  constructor(private router:Router, private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog , private ipdService:IpdService, private fb: FormBuilder) { 
    
    this.vaccinationInfoForm = new FormGroup({
      scheduleForCtrl: new FormControl(''),
      associateEmpl: new FormControl(''),
      relationWithEmployee: new FormControl('')
    });

    /*
      this.vaccinationGivenForm = new FormGroup({
        givenDate : new FormControl('')
      
      });
    */

    this.vaccinationDctrForm = new FormGroup({
      doctorsComment : new FormControl('')
    });

/*
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
      bp: new FormControl(''),
      jaundice: new FormControl(''),
      odema: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl('')
    
    });
*/

    this.patientObj = this.datashareService.getData();

    console.log("patient Object Vaccination");

    console.log(this.patientObj);

    if(this.patientObj){
      localStorage.setItem("patientid_vacc", this.patientObj.patient_id);
      localStorage.setItem("tpcd", this.patientObj.patient_code);
      localStorage.setItem("regid", this.patientObj.registration_id);
    }
   
    this.localStrgPcode = localStorage.getItem("tpcd");
    this.localStrgRid = localStorage.getItem("regid");
    this.localStrgPatientID = localStorage.getItem("patientid_vacc");

    //console.log("Patient Code "+this.localStrgPcode);
    //console.log("Patient Rid "+this.localStrgRid);
    console.log("Patient Vacc ID " + this.localStrgPatientID);


  }

  version = VERSION;
  private associatedEmplList: AssociatedEmpl[] = [];
  public filteredAssociatedEmpl: ReplaySubject<AssociatedEmpl[]> = new ReplaySubject<AssociatedEmpl[]>(1);
  
  @ViewChild('singleSelect') singleSelect: MatSelect; 

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  ngOnInit() {
    this.vaccinationGivenForm = this.fb.group({
      vaccinRows: this.fb.array([])
    });

    this.getRelations();
    this.getVaccinationSchedule();


    let response;
    let pdata;
 

    /* this.patientService.getPatientInfoByCode(this.localStrgPcode).then(data => { */
    this.patientService.getPatientInfoByPatientID(localStorage.getItem("patientid_vacc")).then(data => {
      response = data;
      if(response.msg_status==200) {
        pdata = response.result ; 

        this.vaccinationInfoForm.patchValue({
          associateEmpl: pdata.employee_id,
          relationWithEmployee: pdata.relation
        });
    }
    else{
       
      }
     },

     error => {
         console.log("There is some error on submitting...");
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

  
  
  getVaccinationSchedule() {

    //console.log(patientID);

    let dataval;
    let vacschedulelist;
    this.commonService.getVaccinationSchedule().then(data => {
      dataval = data;
      vacschedulelist = dataval.result;
      this.vaccinationScheduleList.push(vacschedulelist);


      //console.log("List");
    //  console.log(this.vaccinationScheduleList);
    },
    error => {
     console.log("There is some error in Vaccination Schedule List...");
   });

  }

  getVaccinationList(event) {
   this.getVaccinationListBySchedule(event.value,this.localStrgPatientID);
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
         
      const control = <FormArray>this.vaccinationGivenForm.controls['vaccinRows'];
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

  

  
  submitPre() {
    /*
    console.log(this.presciptionHealthForm.value);
    console.log(this.vaccinationInfoForm.value);
    console.log(this.vaccinationGivenForm.value);
    */
   
        let response;
        this.patientService.insertIntoVaccine(this.presciptionHealthForm.value,this.vaccinationInfoForm.value,this.vaccinationGivenForm.value,this.vaccinationDctrForm.value,).then(data => {
          response = data;

        
          if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
             let presdata =  response.result;
             this.vaccinationGivenForm.reset();
             this.vaccinationDctrForm.reset();
             this.vaccinationInfoForm.reset();

             localStorage.removeItem("patientid_vacc");
             localStorage.removeItem("tpcd");
             localStorage.removeItem("regid");
             localStorage.removeItem("regtype");

             
             //this.openDialog();
             this.openDialogWithPdfPreview(presdata.prescription,presdata.healthprfl,'O','VACCINATION');
         
          }
          else {
            this.openDialogError();
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
        msg : 'Vaccination Done Successfully',
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
        btnurl : 'panel/todaysnewreg',
        savedIdRef  : idinfo
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }


  /*
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
*/


}
