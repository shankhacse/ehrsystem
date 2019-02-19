import { Component, OnInit,Inject  } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../../service/patient.service';
import { Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-importgrnvalidationdialog',
  templateUrl: './importgrnvalidationdialog.component.html',
  styleUrls: ['./importgrnvalidationdialog.component.css']
})
export class ImportgrnvalidationdialogComponent implements OnInit {
  exceldata;
  grnList=[];
  public isButtonVisible = true;
  totalError=0;

  updatemessage:string;
  updateaction:string;
  validFormErr:string;

  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<ImportgrnvalidationdialogComponent> ,
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
    const count1 = Object.keys(this.exceldata.batch).length;
    if(count1 > 0) {
      let resultObj1;
      for(let i = 0; i<count1; i++){
        console.log('er');
        console.log(this.exceldata.medicine[i].error);
       if(this.exceldata.medicine[i].error != 0){
        this.totalError++;
       }


      resultObj1 = {
          
          'date': this.exceldata.date[i],
          'supplier': this.exceldata.supplier[i],
          'medicine': this.exceldata.medicine[i],
          'batch': this.exceldata.batch[i],
          'expiry': this.exceldata.expiry[i],
          'quantity': this.exceldata.quantity[i],
         
      }
     
      this.grnList.push(resultObj1);
     
      }
    
              console.log(this.totalError);
                if(this.totalError >0){
                  this.isButtonVisible = false;
                  
                }

  }
  }

  saveData(){
    console.log('save');
    console.log(this.grnList);

    let response;
  this.commonService.insertIntoMedicine(this.grnList,).then(data => {
    response = data;
    if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
      this.updatemessage='Saved Successfully';
        this.updateaction='Import File';
 
        console.log('success');
        this.openSnackBar(this.updatemessage,this.updateaction);
      
    }
    else{
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

  redirectToComp(){
     
    this.dialogRef.close();
    this.router.navigateByUrl('panel/grn');
   
  } 

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}//end of class
