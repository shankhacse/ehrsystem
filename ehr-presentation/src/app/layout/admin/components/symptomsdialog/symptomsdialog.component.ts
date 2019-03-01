
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



interface Group {
  id: string;
  name: string;
}

@Component({
  selector: 'app-symptomsdialog',
  templateUrl: './symptomsdialog.component.html',
  styleUrls: ['./symptomsdialog.component.css']
})
export class SymptomsdialogComponent implements OnInit {

  groupsList = []; 
  editSymptomsForm : FormGroup;
  sympIdCtrl:string = "";
  symptomsCtrl:string = "";
  groupCtrl:string = "";

  validFormErr:string = "";

  sympId:string;
  sympName:string;
  group:string;

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;

  updatemessage:string;
  updateaction:string;
  disableClick;

  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<SymptomsdialogComponent> ,
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
    this.sympId = this.data.symptom_id;
    this.sympName = this.data.symptom;
    this.group = this.data.group;
    console.log(this.sympId);
    this.editSymptomsForm = new FormGroup({ 
      sympIdCtrl: new FormControl(''),
      symptomsCtrl: new FormControl(''),
      groupCtrl: new FormControl(''),
      
    });

    this.editSymptomsForm.patchValue({
       
      sympIdCtrl: this.sympId,
      symptomsCtrl: this.sympName,
      groupCtrl: this.group,
     
     
       });
 
  }

    private groups: Group[] = [];
    public filtergroups: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);

    
    ngOnInit() {
      
  
      var isReadableCheck = localStorage.getItem('isReadable');
      console.log('isReadable symptoms: '+isReadableCheck);
      if(isReadableCheck=='true'){
        this.disableClick = 1;
      }else{
        this.disableClick = 0;
      }
  
      this.getGroups();
    }

    getGroups() {
   
      let dataval;
      let grouplist;
      this.commonService.getGroup().then(data => {
        this.groupsList = [];
        dataval = data;
        grouplist = dataval.result;
        this.groupsList.push(grouplist);
        console.log(this.groupsList);
      },
      error => {
       console.log("There is some error in Relation List...");
     });
    }


    onSubmitEdit(formdata) {
      console.log(formdata);
      
  
     
     
      if(this.validateForm()){
     
      let response;
      this.commonService.updateSymptoms(formdata,).then(data => {
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

    redirectToComp(){
      console.log(this.redirectUrl);
      this.dialogRef.close();
      this.router.navigateByUrl(this.redirectUrl);
     
    }

    validateForm(){
      this.validFormErr = "";
      let validForm = false;
  
      if(this.editSymptomsForm.controls['symptomsCtrl'].value==''){
            this.validFormErr = "Error : Symptoms is required";
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

}//end of class
