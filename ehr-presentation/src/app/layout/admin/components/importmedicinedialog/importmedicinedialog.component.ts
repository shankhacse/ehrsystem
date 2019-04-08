import { Component, OnInit,Inject  } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../../service/patient.service';
import { Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-importmedicinedialog',
  templateUrl: './importmedicinedialog.component.html',
  styleUrls: ['./importmedicinedialog.component.css']
})
export class ImportmedicinedialogComponent implements OnInit {

  exceldata;
  medList=[];
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
    public dialogRef: MatDialogRef<ImportmedicinedialogComponent> ,
    private commonService:CommonService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { 
    this.exceldata = this.data;  
    console.log("Start");
    console.log(this.exceldata);
    console.log("End");
  }

  ngOnInit() {
    const count1 = Object.keys(this.exceldata.medicine_name).length;
    this.totalrow=count1;
    this.validFormErr='';
    if(count1 > 0) {
      let resultObj1;
      for(let i = 0; i<count1; i++){
        console.log('er');
        console.log(this.exceldata.medicine_type[i].error);
       if(this.exceldata.medicine_type[i].error != 0){
        this.totalError++;
       }
      



      resultObj1 = {
          
          'medicine_name': this.exceldata.medicine_name[i],
          'medicine_type': this.exceldata.medicine_type[i],
        
         
      }
     
      this.medList.push(resultObj1);
     
      }
    
              console.log(this.totalError);
                if(this.totalError >0){
                  this.isButtonVisible = false;

                  this.validFormErr='Error: Total incorrect Data: '+this.totalError;
                  
                }

  }

  }// end of onit



  saveData(){
    console.log('save');
    console.log(this.medList);
    //this.totalrow=5;
    const count2 = Object.keys(this.exceldata.medicine_name).length;
    console.log(count2);
    this.isProcess=true;
    for(let i = 0; i<count2; i++){
    let response;
    this.commonService.insertIntoMedicinefromImport(this.medList[i],).then( data => {
      
    
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
    this.router.navigateByUrl('panel/importmedicine');
   
  } 

  redirectToPatientList(){
     
    this.dialogRef.close();
    this.router.navigateByUrl('panel/medlist');
   
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}// end of class
