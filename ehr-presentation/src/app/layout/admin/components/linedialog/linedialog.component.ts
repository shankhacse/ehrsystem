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

interface Division {
  id: string;
  code: string;
}

@Component({
  selector: 'app-linedialog',
  templateUrl: './linedialog.component.html',
  styleUrls: ['./linedialog.component.css']
})
export class LinedialogComponent implements OnInit {
  editLineForm : FormGroup;
  divisionList = []; 
  
  lineIdCtrl:string = "";
  lineCodeCtrl:string = "";
  lineNameCtrl:string = "";
  divisionCtrl:string = "";
 
  validFormErr:string = "";

  lineId:string;
  lineCode:string;
  lineName:string;
  division:string;

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;

  updatemessage:string;
  updateaction:string;

  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<LinedialogComponent> ,
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
    this.lineId = this.data.line_id;
    this.lineCode = this.data.line_code;
    this.lineName = this.data.line_name;
    this.division = this.data.division_code;
    console.log(this.lineId);
    this.editLineForm = new FormGroup({ 
      lineIdCtrl: new FormControl(''),  
      divisionCtrl: new FormControl('', Validators.required),  
      lineCodeCtrl: new FormControl('', Validators.required),  
      lineNameCtrl: new FormControl('', Validators.required),  
      
    });

 
    this.editLineForm.patchValue({
       
      lineIdCtrl: this.lineId,
      lineCodeCtrl: this.lineCode,
      lineNameCtrl: this.lineName,
      divisionCtrl: this.division,
     
     
       });
   }

  private divisions: Division[] = [];
  public filterdivision: ReplaySubject<Division[]> = new ReplaySubject<Division[]>(1);

 ngOnInit() {
   this.getDivision('division_master'); //@param--tablename
   
 }

 
 getDivision(tablename) {
   
  let dataval;
  let divisionlist;
  this.commonService.getDropdownData(tablename).then(data => {
    this.divisionList = [];
    dataval = data;
    divisionlist = dataval.result;
    this.divisionList.push(divisionlist);
    console.log(this.divisionList);
  },
  error => {
   console.log("There is some error in Relation List...");
 });
}

onSubmitEdit(formdata) {
  console.log(formdata);
  

 
 
  if(this.validateForm()){
 
  let response;
  this.commonService.updateLine(formdata,).then(data => {
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


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}

validateForm(){
  this.validFormErr = "";
  let validForm = false;

  if(this.editLineForm.controls['divisionCtrl'].value==''){
        this.validFormErr = "Error : Division is required";
        return validForm = false;
      
  }

  if(this.editLineForm.controls['lineCodeCtrl'].value==''){
    this.validFormErr = "Error : Line Code is required";
    return validForm = false;
  
 }

 if(this.editLineForm.controls['lineNameCtrl'].value==''){
  this.validFormErr = "Error : Line Name is required";
  return validForm = false;

}




  validForm = true;
  return validForm;
}

redirectToComp(){
  console.log(this.redirectUrl);
  this.dialogRef.close();
  this.router.navigateByUrl(this.redirectUrl);
 
}

}
