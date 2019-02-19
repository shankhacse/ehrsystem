import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { IpdService } from '../../../service/ipd.service';



@Component({
  selector: 'app-confirmationdischarge',
  templateUrl: './confirmationdischarge.component.html',
  styleUrls: ['./confirmationdischarge.component.css']
})
export class ConfirmationdischargeComponent implements OnInit {

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;
  idfordel:number;
  tblColumn:string;
  delfromTbl:string;


  constructor(private router:Router,public dialogRef: MatDialogRef<ConfirmationdischargeComponent> , private commonService:CommonService,private patientService:PatientService, private ipdService:IpdService, @Inject(MAT_DIALOG_DATA) public data: any ) {

    this.msg = this.data.msg;  
    this.msgIcon = this.data.msgicon;
    this.iconColor = this.data.iconcolor;
    this.redirectUrl = this.data.btnurl;
    this.idfordel = this.data.delid;
   

   }

  ngOnInit() {
  }

  /*
  redirectToComp(){
    this.dialogRef.close();
    this.router.navigateByUrl(this.redirectUrl);
   
  }
  */

 cancelDialog() {
  let data = {  "from" : "CANCEL"}
  this.dialogRef.close(data);
 }

  removeDischarge(delid) {
    let response;
    this.ipdService.removeDischarge(delid).then(data => {
      response = data;
     
      if(response.msg_status==200) {

       // console.log("Inside");

           let data = {  "from" : "SAVE"}
          this.dialogRef.close(data);
      }
      else{
      
      }
     },
      error => {
         console.log("There is some error on updating...");
     });




  }


}
