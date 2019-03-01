import { Component, OnInit,Inject  } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../../service/patient.service';
import { Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';
import {MatSnackBar} from '@angular/material';
import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-divisiondialog',
  templateUrl: './divisiondialog.component.html',
  styleUrls: ['./divisiondialog.component.css']
})
export class DivisiondialogComponent implements OnInit {

  editDiavisionForm : FormGroup;
  
  diviIdCtrl:string = "";
  divCodeCtrl:string = "";
  divNameCtrl:string = "";
 

  validFormErr:string = "";

  diviId:string;
  diviCode:string;
  diviName:string;

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;

  updatemessage:string;
  updateaction:string;
  disableClick;

  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<DivisiondialogComponent> ,
    private commonService:CommonService,
    private patientService:PatientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.msg = this.data.msg;  
    this.msgIcon = this.data.msgicon;
    this.iconColor = this.data.iconcolor;
    this.redirectUrl = this.data.btnurl;
    this.diviId = this.data.division_id;
    this.diviCode = this.data.division_code;
    this.diviName = this.data.division_name;

    
    console.log(this.diviId);
    this.editDiavisionForm = new FormGroup({ 
      diviIdCtrl: new FormControl(''),
      divCodeCtrl: new FormControl(''),
      divNameCtrl: new FormControl(''),
      
    });

    this.editDiavisionForm.patchValue({
       
      diviIdCtrl: this.diviId,
      divCodeCtrl: this.diviCode,
      divNameCtrl: this.diviName,
     
     
       });

   }

  ngOnInit() {


  
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable editDivision: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }

  }

  onSubmitEdit(formdata) {
    console.log(formdata);
    

   
   
    if(this.validateForm()){
   
    let response;
    this.commonService.updateDivision(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
           
        //this.openDialog();
        this.updatemessage='Save Successfully';
        this.updateaction='';
 
        
        this.openSnackBar(this.updatemessage,this.updateaction);
        
        
      }
      else{
       // this.openDialogError();
       this.updatemessage='Something Wrong!';
       this.updateaction='';

       
       this.openSnackBar(this.updatemessage,this.updateaction);
      }
      console.log(response);
    },
    error => {
        console.log("There is some error on submitting...");
    });
  }

  }

  validateForm(){
    this.validFormErr = "";
    let validForm = false;

    if(this.editDiavisionForm.controls['divCodeCtrl'].value=='' || this.editDiavisionForm.controls['divCodeCtrl'].value==null){
          this.validFormErr = "Error : Division Code is required";
          return validForm = false;
        
    }

    if(this.editDiavisionForm.controls['divNameCtrl'].value=='' || this.editDiavisionForm.controls['divNameCtrl'].value==null){
      this.validFormErr = "Error : Division Name is required";
      return validForm = false;
    
}

  
    validForm = true;
    return validForm;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  redirectToComp(){
    console.log(this.redirectUrl);
    this.dialogRef.close();
    this.router.navigateByUrl(this.redirectUrl);
   
  }

}
