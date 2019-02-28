import { Component, OnInit,Inject  } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../../service/patient.service';
import { Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-importdependentdialog',
  templateUrl: './importdependentdialog.component.html',
  styleUrls: ['./importdependentdialog.component.css']
})
export class ImportdependentdialogComponent implements OnInit {

  exceldata;
  depList=[];
  public isButtonVisible = true;
  totalError=0;

  updatemessage:string;
  updateaction:string;
  validFormErr:string;
  
  totalrow=0;
  insertrow=0;
  incorrectClose=false;
  public isProcess = false;
  public afterProcess=false;

  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<ImportdependentdialogComponent> ,
    private commonService:CommonService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.exceldata = this.data;  
    // console.log("Start");
    // console.log(this.exceldata);
    // console.log("End");
   }

   ngOnInit() {
    const count1 = Object.keys(this.exceldata.worker_code).length;
    this.totalrow=count1;
    this.validFormErr='';
    if(count1 > 0) {
      let resultObj1;
      for(let i = 0; i<count1; i++){
        console.log('er');
        console.log(this.exceldata.worker_code[i].error);
       if(this.exceldata.worker_code[i].error != 0){
        this.totalError++;
       }
       if(this.exceldata.relation[i].error != 0){
        this.totalError++;
       }
       if(this.exceldata.dependent_name[i].error != 0){
        this.totalError++;
       }
       if(this.exceldata.dob[i].error != 0){
        this.totalError++;
       }
       if(this.exceldata.lineno[i].error != 0){
        this.totalError++;
       }
       if(this.exceldata.divisionno[i].error != 0){
        this.totalError++;
       }



      resultObj1 = {
          
          'worker_code': this.exceldata.worker_code[i],
          'worker_name': this.exceldata.worker_name[i],
          'relation': this.exceldata.relation[i],
          'dependent_name': this.exceldata.dependent_name[i],
          'active': this.exceldata.active[i],
          'sex': this.exceldata.sex[i],
          'dob': this.exceldata.dob[i],
          'houseno': this.exceldata.houseno[i],
          'lineno': this.exceldata.lineno[i],
          'divisionno': this.exceldata.divisionno[i],
          
         
      }
     
      this.depList.push(resultObj1);
     
      }
    
              console.log(this.totalError);
                if(this.totalError >0){
                  this.isButtonVisible = false;

                  this.validFormErr='Error: Total incorrect Data: '+this.totalError;
                  
                }

  }
  }

  
  saveData(){
    console.log('save');
    console.log(this.depList);
    //this.totalrow=5;
    const count2 = Object.keys(this.exceldata.worker_code).length;
    console.log(count2);
    this.isProcess=true;
    for(let i = 0; i<count2; i++){
    let response;
    this.commonService.insertIntoDependentPatient(this.depList[i],).then( data => {
      
    
     response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
        this.updatemessage='Saved Successfully';
         this.insertrow=i+1;
         if(this.totalrow==this.insertrow){
          this.isProcess=false;
          this.afterProcess=true;
        }
      }
      else{
        this.updatemessage='Saved Successfully';
        this.insertrow=i+1;
        if(this.totalrow==this.insertrow){
          this.isProcess=false;
          this.afterProcess=true;
        }
     
      
      }
      console.log(response);


      
    },
    error => {
        console.log("There is some error on submitting...");
    });

   // console.log('Insert:'+this.insertrow);    
}

console.log('Insert:'+this.insertrow);   
if(this.totalrow==this.insertrow){
  this.isProcess=false;
  this.afterProcess=true;
}


   
  

}


  redirectToComp(){
     
    this.dialogRef.close();
    this.router.navigateByUrl('panel/importdependent');
   
  } 

  redirectToPatientList(){
     
    this.dialogRef.close();
    this.router.navigateByUrl('panel/patientlist');
   
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}// end of class
