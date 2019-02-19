
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

interface Estate {
  name: string;
  code: string;
}

@Component({
  selector: 'app-challandialog',
  templateUrl: './challandialog.component.html',
  styleUrls: ['./challandialog.component.css']
})
export class ChallandialogComponent implements OnInit {

  editChallanForm : FormGroup;
  estateList = []; 
  
  chalanIdCtrl:string = "";
  chalanCodeCtrl:string = "";
  chalanNameCtrl:string = "";
  estateCtrl:string = "";
 
  validFormErr:string = "";

  challanId:string;
  challanCode:string;
  challanName:string;
  estate:string;

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;

  updatemessage:string;
  updateaction:string;

  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<ChallandialogComponent> ,
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
    this.challanId = this.data.challan_id;
    this.challanCode = this.data.challan_code;
    this.challanName = this.data.challan_name;
    this.estate = this.data.estate_code;
    console.log('dialog')
    console.log(this.challanId);
    this.editChallanForm = new FormGroup({ 
      chalanIdCtrl: new FormControl(''),  
      chalanCodeCtrl: new FormControl('', Validators.required),  
      chalanNameCtrl: new FormControl('', Validators.required),  
      estateCtrl: new FormControl('', Validators.required),
      
    });

    this.editChallanForm.patchValue({
      chalanIdCtrl: this.challanId,
      chalanCodeCtrl: this.challanCode,
      chalanNameCtrl: this.challanName,
      estateCtrl: this.estate,
      
     
     
       });
   }

  
   ngOnInit() {
    this.getEstate('estate'); //@param--tablename
    
  }

  getEstate(tablename) {
   
    let dataval;
    let estatelist;
    this.commonService.getDropdownData(tablename).then(data => {
      this.estateList = [];
      dataval = data;
      estatelist = dataval.result;
      this.estateList.push(estatelist);
      console.log(this.estateList);
    },
    error => {
     console.log("There is some error in estate List...");
   });
  }

   onSubmitEdit(formdata) {
      console.log(formdata);
      
  
     
     
      if(this.validateForm()){
     
      let response;
      this.commonService.updateChallan(formdata,).then(data => {
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
  
      if(this.editChallanForm.controls['estateCtrl'].value==''){
            this.validFormErr = "Error : Estate is required";
            return validForm = false;
          
      }
  
      if(this.editChallanForm.controls['chalanCodeCtrl'].value==''){
        this.validFormErr = "Error : Challan Code is required";
        return validForm = false;
      
     }
  
     if(this.editChallanForm.controls['chalanNameCtrl'].value==''){
      this.validFormErr = "Error : Challan Name is required";
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

  


    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

}
