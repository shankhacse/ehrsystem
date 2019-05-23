import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { GlobalconstantService } from '../../../service/globalconstant.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { PatientService } from '../../../service/patient.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-barcodepatientregistrationdialog',
  templateUrl: './barcodepatientregistrationdialog.component.html',
  styleUrls: ['./barcodepatientregistrationdialog.component.css']
})
export class BarcodepatientregistrationdialogComponent implements OnInit {


  bloodGroupList = [];
  patientTypeList = [];
  relationsList = [];
  estateList = [];
  divisionList = [];
  lineList = [];
  challanList = [];
  patientbarCodeRegForm: FormGroup;
  registerButtonActive = true;
  loaderActive = false;
  issubmitted = false;
  maxDate:Date = new Date();
  dobCtrl:string = "";
  disableClick;
  
 
  preg_vacCheck_star=" ";
  dob_star=" ";

  validFormErr:string = "";

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());



  constructor(public dialogRef: MatDialogRef<BarcodepatientregistrationdialogComponent> , private commonService:CommonService,private patientService:PatientService ,  @Inject(MAT_DIALOG_DATA) public data: "d" , private _global:GlobalconstantService ,public dialog: MatDialog,public snackBar: MatSnackBar) {

    this.patientbarCodeRegForm = new FormGroup({
      /* pcodeCtrl: new FormControl(''), */
       regType: new FormControl('' , Validators.required ),
       patientCode: new FormControl('' , Validators.required),
    });

   }

  ngOnInit() {
  }


  onNoClick(): void {
    let data = {
      "from":"Close"
    }
    this.dialogRef.close(data);
  }


  onSubmit(){

    console.log(this.patientbarCodeRegForm.value);

    let response;
    let patientDATA;
    this.patientService.verifyAndRegisterPatient(this.patientbarCodeRegForm.value).then(data => {
      response = data;
      if(response.msg_status==200){
        patientDATA = response.patientdata;

        //console.log("Patient Name :: "+patientDATA.patient_name);
    
        let data = {
         "from" : "Save",
         "patientcode" : patientDATA.patient_code, 
         "patientname" : patientDATA.patient_name,
         "dob" : new Date(patientDATA.dob).toLocaleDateString(),
         "gender" : patientDATA.gender,
         "division" : patientDATA.division_number,
         "challan" : patientDATA.challan_number,
         "line" : patientDATA.line_number,
         "mobile" : patientDATA.mobile_one,
         "aadhar" : patientDATA.adhar,
         "regType" : this.patientbarCodeRegForm.get("regType").value
        }
        this.dialogRef.close(data);
      }
      
      else{
        this.openSnackBar("ERROR : "+response.msg_data);
        // this.registerButtonActive = true;
        // this.loaderActive = false;
      }
     },
       error => {
         console.log("There is some error on submitting...");
     });


  }


  openSnackBar(msg) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    this.snackBar.open(msg, "", config);
   
  }
      

}
