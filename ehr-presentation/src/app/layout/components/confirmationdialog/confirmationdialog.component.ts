import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class ConfirmationdialogComponent implements OnInit {

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;
  idfordel:number;
  tblColumn:string;
  delfromTbl:string;


  constructor(private router:Router,public dialogRef: MatDialogRef<ConfirmationdialogComponent> , private commonService:CommonService,private patientService:PatientService, @Inject(MAT_DIALOG_DATA) public data: any ) {

    this.msg = this.data.msg;  
    this.msgIcon = this.data.msgicon;
    this.iconColor = this.data.iconcolor;
    this.redirectUrl = this.data.btnurl;
    this.idfordel = this.data.delid;
    this.tblColumn = this.data.tblidcolumn;
    this.delfromTbl = this.data.tblinfo;

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
   
  let data = {
    "from" : "Cancel",
    "msg" : ""
  }
  this.dialogRef.close();
 }

  deleteFromTable(delid,column,tblinfo) {

    //console.log("Delete ID "+delid);
    //console.log("Delete ID "+tblinfo);




    let response;
    this.commonService.deleteRecords(delid,column,tblinfo).then(data => {
      response = data;
      
      /*
      console.log("********");
      console.log(response);
      console.log("********");
      */

      if(response.msg_status==200) {
        

        let data = {
          "from" : "Save",
          "msg" : ""
        }
        this.dialogRef.close(data);


      }
      else if(response.msg_status==222 && response.msg_data=="EXIST") {

        let data = {
          "from" : "EXIST",
          "msg" : "Can not delete this record due to prescription done against this registration",
        }
        this.dialogRef.close(data);
      }
      else{
      
      }
     },
       error => {
         console.log("There is some error on submitting...");
     });


  }

}
