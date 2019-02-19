import { Component, OnInit,Inject } from '@angular/core';


import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successdialog',
  templateUrl: './successdialog.component.html',
  styleUrls: ['./successdialog.component.css']
})
export class SuccessdialogComponent implements OnInit {
  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;

  constructor(private router:Router,public dialogRef: MatDialogRef<SuccessdialogComponent> , private commonService:CommonService,private patientService:PatientService, @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.msg = this.data.msg;  
    this.msgIcon = this.data.msgicon;
    this.iconColor = this.data.iconcolor;
    this.redirectUrl = this.data.btnurl;
  }

  ngOnInit() {
    //console.log(this.data);
  }

  redirectToComp(){
    this.dialogRef.close();
    this.router.navigateByUrl(this.redirectUrl);
   
  }

}
