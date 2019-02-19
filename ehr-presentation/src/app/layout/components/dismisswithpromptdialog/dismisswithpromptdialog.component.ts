import { Component, OnInit,Inject } from '@angular/core';


import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dismisswithpromptdialog',
  templateUrl: './dismisswithpromptdialog.component.html',
  styleUrls: ['./dismisswithpromptdialog.component.css']
})
export class DismisswithpromptdialogComponent implements OnInit {

  constructor(private router:Router,public dialogRef: MatDialogRef<DismisswithpromptdialogComponent> , public dialog: MatDialog, private commonService:CommonService,private patientService:PatientService, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }

  closeMe(){
  
    this.dialogRef.close();
  }
  closeAll(){
   
    this.dialog.closeAll();
  }

}
