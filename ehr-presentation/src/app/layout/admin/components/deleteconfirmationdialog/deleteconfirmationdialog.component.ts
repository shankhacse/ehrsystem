import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteconfirmationdialog',
  templateUrl: './deleteconfirmationdialog.component.html',
  styleUrls: ['./deleteconfirmationdialog.component.css']
})
export class DeleteconfirmationdialogComponent implements OnInit {

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;
  idfordel:number;
  tblColumn:string;
  delfromTbl:string;

  constructor(
    private router:Router,public dialogRef: MatDialogRef<DeleteconfirmationdialogComponent> , private commonService:CommonService, @Inject(MAT_DIALOG_DATA) public data: any 
  ) { 
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

  cancelDialog() {
    this.dialogRef.close();
   }

   deleteFromTable(delid,column,tblinfo) {

    console.log("Delete ID "+delid);
    console.log("Delete ID "+tblinfo);




    let response;
    this.commonService.deleteRowRecords(delid,column,tblinfo).then(data => {
      response = data;
     
      if(response.msg_status==200) {
        

        let data = {
          "from" : "Save",
           
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
